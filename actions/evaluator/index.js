import core from "@actions/core";
import fs from "fs";

import {
  testFreudVersion,
  runTestInParallel,
  testComparator,
} from "./src/runner.js";
import { loadTest } from "./src/init.js";
import { resolve } from "path";
import { computeScore } from "./src/grader.js";
import { printReport } from "./src/printer.js";

// most @actions toolkit packages have async methods
async function run() {
  try {
    console.log("Starting evaluation");
    console.log("release/evaluator2024.1");

    const buildDirectory = core.getInput("buildDirectory");
    const testsDirectory = core.getInput("testsDirectory");
    const executableName = core.getInput("executableName");
    const comparatorPath = core.getInput("comparatorPath");
    console.log("buildDirectory", buildDirectory);
    const executablePath =
      "timeout 0.5s " + resolve(buildDirectory, executableName);
    const config = {
      buildDirectory: resolve(buildDirectory),
      executablePath: executablePath,
      testPath: resolve(testsDirectory),
      comparatorPath: "timeout 0.5s " + resolve(comparatorPath),
    };
    await testFreudVersion(config.executablePath);
    await testComparator(config);
    const testsObject = await loadTest();
    await runTestInParallel(config, testsObject);
    const score = computeScore(testsObject);

    let status = "pass";
    let tests = Object.values(testsObject.milestones).flat();
    const result = {
      version: 1,
      status,
      max_score: tests.length,
      score,
      tests: tests.map((test) => {
        return {
          name: test.name,
          status: test.score > 0.8 ? "pass" : "fail",
          message: test.description,
          test_code: test.feature,
          filename: test.input.join(","),
          line_no: 0,
          execution_time: test.execution_time,
          score: test.score,
        };
      }),
    };
    // Save the result as a json file

    core.startGroup("Test Report");
    console.log(result);

    core.endGroup();

    core.setOutput("result", btoa(JSON.stringify(result)));
    fs.writeFileSync("result.json", JSON.stringify(result, null, 2));
    core.setOutput("grade", score);

    printReport(testsObject);
  } catch (error) {
    core.endGroup();
    core.setFailed(error.message);
    core.setOutput("grade", 0);

    let status = "error";
    let tests = Object.values(testsObject.milestones).flat();
    tests = tests.map((test) => {
      return {
        name: test.name,
        status: "fail",
        message: test.message,
        test_code: test.feature,
        filename: test.input,
        line_no: 0,
        execution_time: 0,
        score: 0,
      };
    });
    tests = tests.concat([
      {
        name: "Freud Version",
        status: "fail",
        message: error.message,
        test_code: "",
        filename: "",
        line_no: 0,
        execution_time: 0,
        score: 0,
      },
    ]);

    const result = {
      version: 1,
      status,
      max_score: tests.length,
      score: 0,
      tests,
    };

    core.setOutput("result", btoa(JSON.stringify(result)));
    fs.writeFileSync("result.json", JSON.stringify(result, null, 2));
  }
}

function btoa(str) {
  return Buffer.from(str).toString("base64");
}

//Run a test TODO: implement test that compare a file

run();
