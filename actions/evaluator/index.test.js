const process = require('process');
const cp = require('child_process');
const path = require('path');
//
// test('throws invalid number', async () => {
//   await expect(wait('foo')).rejects.toThrow('milliseconds not a number');
// });
//
// test('wait 500 ms', async () => {
//   const start = new Date();
//   await wait(500);
//   const end = new Date();
//   var delta = Math.abs(end - start);
//   expect(delta).toBeGreaterThanOrEqual(500);
// });

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env["INPUT_BUILDDIRECTORY"] = "/Users/dimitri/Documents/workspace/enseignement/2022/1a/GenieInfo/Projet/projetGenieInfo_prof/build";
  process.env["INPUT_TESTSDIRECTORY"] = "/Users/dimitri/Documents/workspace/enseignement/2022/1a/GenieInfo/Projet/projetGenieInfo_prof/images/";
  process.env["INPUT_ENTRYPOINT"] = "test.json";
  process.env["INPUT_EXECUTABLENAME"] = "freud";

  const ip = path.join(__dirname, 'dist', 'index.js');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
  console.log(result);
})
