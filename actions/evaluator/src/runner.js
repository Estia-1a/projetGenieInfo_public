import io from "@actions/io";
import core from "@actions/core";
import exec from "@actions/exec";
import {resolve} from "path" ;
import { listenerOutput } from "./utils.js";
import batchPromise from "./batchPromise.js";

let uuid = 0 ;
async function runTest(config, test) {
  try {
    const options = {};
    options.listeners = {};
    options.listeners.stdout = listenerOutput(test, "stdout");
    options.listeners.stderr = listenerOutput(test, "stderr");
    options.silent = true;
    const cwd = `${config.buildDirectory}/run/${uuid++}`
    await io.mkdirP( cwd ) ;
    options.cwd = cwd ;
    core.info("Run Test :" + test.name);
    await exec.exec(
      config.executablePath,
      [
        "-f",
        resolve(config.testPath, test.input[0]), //Todo: change for multiple input test
        ...test.options
      ],
      options
    );


    if( test.type == "image" ) {
      options.listeners.stdout = listenerOutput(test, "image_comparator");
      await exec.exec(
        config.comparatorPath,
        [
          resolve(cwd, test.expectedOutput[0]), //Todo: change for multiple input test
          resolve(config.testPath, test.reference[0]), //Todo: change for multiple input test

        ],
        options
      );

    }

    return test;
  } catch (error) {
    test.error = error;
    return test;
  }
}

export async function runTestInParallel(config, testsObject) {

  core.startGroup("Run Tests");
  const runner = test =>
    runTest(config, test);
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

//Check if freud is accessible by running freud --version.
export async function testComparator(config) {
  core.startGroup("Check Comparator");
  const { exitCode, stdout } = await exec.getExecOutput(
    config.comparatorPath,
    [
      resolve(config.testPath, "input/b_32x32.bmp"),
      resolve(config.testPath, "input/b_32x32.bmp")
    ],
    { silent: true }
  );
  if (exitCode === 0 && stdout.match("100")) {
    core.info("Comparator has been found : " + stdout.trim());
  } else {
    core.info("Comparator did not find a match");
    throw new Error("Comparator not working properly");
  }
  core.endGroup();
}
