import core from "@actions/core";

import {testFreudVersion, runTestInParallel } from "./src/runner.js" ;
import {loadTest} from "./src/init.js" ;
import { resolve } from "path" ;
import { computeScore } from "./src/grader.js"
import { printReport} from "./src/printer.js"



// most @actions toolkit packages have async methods
async function run() {
  try {
    const buildDirectory = core.getInput("buildDirectory");
    const testsDirectory = core.getInput("testsDirectory");
    const executableName = core.getInput("executableName");
    const executablePath = resolve(buildDirectory, executableName);

    await testFreudVersion(executablePath);
    const testsObject = await loadTest();
    await runTestInParallel(
      resolve(buildDirectory),
      executablePath,
      resolve(testsDirectory),
      testsObject
    );
    const score = computeScore(testsObject);
    core.setOutput("grade", score);

    printReport(testsObject);
  } catch (error) {
    core.endGroup();
    core.setFailed(error.message);
    core.setOutput("grade", 0);
  }
}






//Run a test TODO: implement test that compare a file


run();
