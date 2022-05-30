const core = require('@actions/core');
const exec = require('@actions/exec');
const path = require('path');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const buildDirectory = core.getInput('buildDirectory');
    const testsDirectory = core.getInput('testsDirectory');
    const entryPoint = core.getInput('entryPoint');
    const executableName = core.getInput('executableName');


    let myOutput = '';
    let myError = '';

    const options = {};
    options.listeners = {
      stdout: (data) => {
        myOutput += data.toString();
      },
      stderr: (data) => {
        myError += data.toString();
      }
    };
    options.cwd = path.resolve( buildDirectory ) ;

    console.log( buildDirectory ) ;
    console.log( path.resolve(buildDirectory, executableName ));
    core.info(path.resolve( testsDirectory, entryPoint ));

    await exec.exec( path.resolve(buildDirectory, executableName ),
      ['--debug'
      , '-f', testsDirectory +  'imput/image.jpeg'
      , '-o blue'
      , '--jpg']
    , options);


    core.info(myOutput);
    core.debug(myError); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    core.setOutput('grade',  12 );
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
