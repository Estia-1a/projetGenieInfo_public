const core = require("@actions/core");
const exec = require("@actions/exec");
const path = require("path");
const testsObject = require("./tests/tests.js");
const batchPromise = require("./batchPromise");

// most @actions toolkit packages have async methods
async function run() {
  try {
    const buildDirectory = core.getInput("buildDirectory");
    const testsDirectory = core.getInput("testsDirectory");
    const executableName = core.getInput("executableName");
    const executablePath = path.resolve(buildDirectory, executableName);

    await testFreudVersion(executablePath);
    await loadTest() ;
    await runTestInParallel(
      path.resolve(buildDirectory),
      executablePath,
      path.resolve(testsDirectory)
    );
    const score = computeScore()
    core.setOutput("grade", score );
  } catch (error) {
    core.endGroup();
    core.setFailed(error.message);
    core.setOutput("grade", 0);
  }
}

function listenerOutput(test, type) {
  test[type] = "";
  return data => (test[type] += data);
}


//Check if freud is accessible by running freud --version.
async function testFreudVersion(executablePath) {
  core.startGroup("Find Freud");
  const { exitCode, stdout } = await exec.getExecOutput(
    executablePath,
    ["--version"],
    { silent: true }
  );
  if (exitCode === 0) {
    core.info("Freud has been found" + stdout.trim());
  } else {
    core.info("Freud returned an error when run with --version");
    throw new Error("Freud not working properly");
  }
  core.endGroup();
}

//Get the tests. TODO: Load the Manifest and prune tests for feature not implemented
async function loadTest() {
  core.startGroup("Load Tests");
  core.info(`Manifest not loaded`);
  core.info(
    `Loaded ${Object.values(testsObject.milestones).flat().length} tests`
  );
  core.endGroup();
}

//Run a test TODO: implement test that compare a file 
async function runTest(buildDirectory, executablePath, testPath, test) {
  try {
    const options = {};
    options.listeners = {};
    options.listeners.stdout = listenerOutput(test, "stdout");
    options.listeners.stderr = listenerOutput(test, "stderr");
    options.silent = true;
    options.cwd = path.resolve(buildDirectory);
    core.info("Run Test :" + test.name);
    await exec.exec(
      executablePath,
      [
        "-f",
        path.resolve(testPath, test.input[0]), //Todo: change for multiple input test
        ...test.options
      ],
      options
    );
    return test;
  } catch (error) {
    test.error = error;
    return test;
  }
}

async function runTestInParallel(buildDirectory, executablePath, testPath) {
  core.startGroup("Run Tests");
  const runner = test =>
    runTest(buildDirectory, executablePath, testPath, test);
  const data = await batchPromise(
    runner,
    Object.values(testsObject.milestones).flat(),
    10
  );
  core.endGroup();
  return data;

}

function evalTest(test) {
  if (test.type === "stdout") {
    test.score = RegExp(test.output).test(test.stdout) ? 1 : 0;
  } else {
    test.score = 0;
  }
  return test;
}

function computeScore() {

  const tests = Object.values(testsObject.milestones).flat()
  tests.forEach(test => evalTest(test))
  core.startGroup("tests results");
  tests.forEach(test => core.info( `Feature ${test.name} : ${test.score}`) )
  core.endGroup();
  core.startGroup("Feature grading");
  Object.entries(tests.reduce( (accumulator,test)=> {accumulator[test.feature] = (accumulator[ test.feature ]??0)+ test.score ; return accumulator }, {} ))
        .forEach( ([feature,score]) => core.info( `Feature ${feature} : ${score}`) )
  core.endGroup();
  return tests.reduce((accumlateur, test) => accumlateur + test.score, 0);
}

Array.prototype.each = (fn)=>{this.forEach(fn);return this}
// function computeScore() {}
// function outputScore() {}

run();
