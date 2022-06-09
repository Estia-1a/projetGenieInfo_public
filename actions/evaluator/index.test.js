import process from "process";
import cp from "child_process";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import tests from "./tests/tests.js";
import batchPromises from "./batchPromise";

beforeEach(() => {
  jest.resetModules();
  const doc = yaml.load(
    fs.readFileSync(__dirname + "/action.test.yml", "utf8")
  );
  Object.keys(doc.inputs).forEach((name) => {
    const envVar = `INPUT_${name.replace(/ /g, "_").toUpperCase()}`;
    process.env[envVar] = doc.inputs[name]["default"];
  });
});

afterEach(() => {
  const doc = yaml.load(
    fs.readFileSync(__dirname + "/action.test.yml", "utf8")
  );
  Object.keys(doc.inputs).forEach((name) => {
    const envVar = `INPUT_${name.replace(/ /g, "_").toUpperCase()}`;
    delete process.env[envVar];
  });
});
// shows how the runner will run a javascript action with env / stdout protocol
test("load test files", () => {
  expect(tests).toEqual(
    expect.objectContaining({ milestones: { statistiques: expect.any(Array) } })
  );
});

test("batchPromises", async () => {
  const data = await batchPromises(
    (e) => {
      return new Promise((res) => setTimeout(() => res(e), e));
    },
    Array(10)
      .fill(1)
      .map(() => Math.random() * 1000),
    10
  );
  expect(data).toEqual(expect.any(Array));
});

test("test runs", () => {
  const ip = path.join(__dirname, "dist", "index.js");
  const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
  console.log(result);
});
