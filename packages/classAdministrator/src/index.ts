import { config } from "dotenv";
import { Octokit } from "octokit";

/**
 *
 * @param mode Which mode ro run
 */
async function run(mode: string) {
  init();
  switch (mode) {
    case "test":
      await test();
      break;
    case "rooster":
      await getRooster();
  }
}

async function getRooster() {
  return true;
}

async function test() {
  // Hydrate Octokit 
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login);
}

function init() {
  config();
}
run("test");
