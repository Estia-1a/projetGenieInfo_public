import core from "@actions/core";
import io from "@actions/io";
import fs from "fs/promises";

import tablemark from "tablemark";
import { testsObjectToArray, timeString, dateString } from "./utils.js";

export async function printReport(testsObject) {
  core.startGroup("print report");
  const timestamp = timeString();

  await logRawTestResults(testsObject, timestamp);
  const resultat = computeSummary(testsObject);
  const markdown = createMarkdownOutput(resultat);
  await logSummary(markdown, timestamp);
  console.table(resultat);
  core.setOutput("date", dateString());
  core.setOutput("markdown", markdown);
  core.endGroup();
}

async function logRawTestResults(testsObject, timestamp) {
  await io.mkdirP(`result/${timestamp}`);
  await fs.writeFile(
    `result/${timestamp}/log_${timeString()}.json`,
    JSON.stringify(testsObject),
    "utf8"
  );
}
async function logSummary(markdown, timestamp) {
  await fs.writeFile(`result/${timestamp}/Readme.md`, markdown, "utf8");
}

function computeSummary(testsObject) {
  const resultat = {};
  testsObjectToArray(testsObject).forEach(test => {
    resultat[test.milestone] = resultat[test.milestone] ?? {
      score: 0,
      count: 0,
      features: []
    };
    resultat[test.milestone].features[test.feature] = resultat[test.milestone]
      .features[test.feature] ?? {
      feature: test.feature,
      score: 0,
      count: 0,
      missedTest: [],
      missedTestOut: []
    };
    const feature = resultat[test.milestone].features[test.feature];
    // Count the test for the milestone
    resultat[test.milestone].score += test.score;
    resultat[test.milestone].count++;
    // Count the test for the feature
    feature.score += test.score;
    feature.count += 1;
    if (test.score < 0.5) feature.missedTest.push(test.name);
    if (test.score < 0.5) feature.missedTestOut.push(test.stdout.trim());
  });
  return resultat;
}

function createMarkdownOutput(resultat) {
  let markdown = "# Daily Evaluation " + dateString() + "\n";
  markdown +=
    "You can find below how you did for each feature. \n You should merge the pull request to keep the eval and automatically close and open the issues you have finished!\n";
  Object.entries(resultat).forEach(([milestone, data]) => {
    markdown += `# Milestone  ${milestone}\n`;
    markdown += `Score : ${data.score}/${data.count} :  ${Math.floor(
      (100 * data.score) / data.count
    )}%\n`;
    markdown += `## Detail by Feature\n`;
    markdown += tablemark(
      Object.values(data.features).map(feature => ({
        Feature: feature.feature,
        score: `${feature.score}/${feature.count} :  ${Math.floor(
          (100 * data.score) / data.count
        )}%`,
        "missed tests": feature.missedTest.join("<br>").trim(),
        "stdout": feature.missedTestOut.join("<br>").trim()
      }))
    );
    markdown += "\n";
    // markdown += "## Related issues\n"
    // markdown += "close #24\n"
    // markdown += "open #17\n"
  });
  return markdown;
}
