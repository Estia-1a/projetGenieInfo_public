import core from "@actions/core";
import testsObject from "./tests/tests.js";

export function evalTest(test) {
  if (test.type === "stdout") {
    test.score = RegExp(test.output).test(test.stdout) ? 1 : 0;
  } else {
    test.score = 0;
  }
  return test;
}

export function computeScore( testsObject ) {
  const tests = Object.values(testsObject.milestones).flat();
  tests.forEach(test => evalTest(test));
  core.startGroup("tests results");
  tests.forEach(test => core.info(`Feature ${test.name} : ${test.score}`));
  core.endGroup();
  core.startGroup("Feature grading");
  Object.entries(
    tests.reduce((accumulator, test) => {
      accumulator[test.feature] = (accumulator[test.feature] ?? 0) + test.score;
      return accumulator;
    }, {})
  ).forEach(([feature, score]) => core.info(`Feature ${feature} : ${score}`));
  core.endGroup();

  return tests.reduce((accumlateur, test) => accumlateur + test.score, 0);
}
