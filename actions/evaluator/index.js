const core = require("@actions/core" );
const exec = require("@actions/exec");
const path = require("path");
const testsObject = require("./tests/tests.js") ;
const batchPromise = require("./batchPromise") ;

// most @actions toolkit packages have async methods
async function run() {
  try {
    const buildDirectory = core.getInput('buildDirectory');
    const testsDirectory = core.getInput('testsDirectory');
    const executableName = core.getInput('executableName');
    runTestInParallel( path.resolve(buildDirectory) , path.resolve(buildDirectory, executableName ), path.resolve(testsDirectory) ) ;
    core.setOutput('grade',  12 );
  } catch (error) {
    core.setFailed(error.message);
  }
}


function listenerOutput( test, type ) {
  test[type] = ""
  return ( data ) => test[type] += data ;
}

async function runTest( buildDirectory, executablePath, testPath, test ) {
  try {
    const options = {};
    options.listeners = {}
    options.listeners.stdout = listenerOutput( test, "result") ;
    options.listeners.stderr = listenerOutput( test, "error") ; 
    options.silent = true;
    options.cwd = path.resolve( buildDirectory ) ;

    await exec.exec( executablePath,
      [ '-f', path.resolve( buildDirectory, test.input[0] )//Todo: change for multiple input test
      , test.options
      ]
    , options);
    return test ;
  } catch(error) {
    test.error = error ;
    return test
  }
}


async function runTestInParallel( buildDirectory, executablePath, testPath) {
  const runner = (test) => runTest(buildDirectory,executablePath, testPath, test ) ;
  const data = await batchPromise(runner, Object.values( testsObject.milestones ).flat() , 10 ) ;
  return data ;
}
// function computeScore() {}
// function outputScore() {}

run();
