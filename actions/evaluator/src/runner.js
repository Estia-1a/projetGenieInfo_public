import core from "@actions/core";
import exec from "@actions/exec";
import {resolve} from "path" ;
import { listenerOutput } from "./utils.js";
import batchPromise from "./batchPromise.js";

async function runTest(buildDirectory, executablePath, testPath, test) {
  try {
    const options = {};
    options.listeners = {};
    options.listeners.stdout = listenerOutput(test, "stdout");
    options.listeners.stderr = listenerOutput(test, "stderr");
    options.silent = true;
    options.cwd = resolve(buildDirectory);
    core.info("Run Test :" + test.name);
    await exec.exec(
      executablePath,
      [
        "-f",
        resolve(testPath, test.input[0]), //Todo: change for multiple input test
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

export async function runTestInParallel(buildDirectory, executablePath, testPath, testsObject) {
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

//Check if freud is accessible by running freud --version.
export async function testFreudVersion(executablePath) {
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
