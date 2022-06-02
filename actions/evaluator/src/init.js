import core from "@actions/core";
import testsObject from "./tests/tests.js";
//Get the tests. TODO: Load the Manifest and prune tests for feature not implemented
export async function loadTest() {
  core.startGroup("Load Tests");
  core.info(`Manifest not loaded`);
  core.info(
    `Loaded ${Object.values(testsObject.milestones).flat().length} tests`
  );
  core.endGroup();
  return testsObject ;
}
