import { Octokit } from "octokit";
import { init } from "./init.js";
import { writeFile, mkdir, readdir, readFile } from "fs/promises";
import {
  GetResponseTypeFromEndpointMethod,
  GetResponseDataTypeFromEndpointMethod,
} from "@octokit/types";

const octokit = new Octokit();
type teamsResponse = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.teams.list
>;
type repositoryResponse = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.rest.teams.listReposInOrg
>;

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

interface Team extends ArrElement<teamsResponse> {
  repository: string;
}

type Repository = ArrElement<repositoryResponse>;

const classroom = {
  organisation: "Estia-1a",
  repositoryPrefix: "pgi-2022",
  teams: [] as Team[],
  repository: new Map<string, Repository>(),
};
/**
 *
 * @param mode Which mode ro run
 */
async function run(mode: string) {
  const octokit = init();
  switch (mode) {
    case "test":
      await testConnection(octokit);
      break;
    case "teams":
      await getAllTeams(octokit);
      break;
    case "rooster":
      if (classroom.teams.length == 0) await getAllTeams(octokit);
      await getRooster(octokit);
      break;
    case "source":
      if (classroom.teams.length == 0) await getAllTeams(octokit);
      await getSourceCode(octokit);
      break;
  }
}

async function asyncFilter<T>(
  arr: T[],
  predicate: (element: T) => Promise<boolean>
) {
  return Promise.all(arr.map(predicate)).then((results) =>
    arr.filter((_v, index) => results[index])
  );
}

//Get all the team that have a repository for the project
async function getAllTeams(octokit: Octokit): Promise<teamsResponse> {
  const repos = new Map<string, Repository>();

  classroom.repository = repos;
  //Compare: https://docs.github.com/en/rest/reference/teams#list-organization-teams
  const teams = (await octokit.paginate(octokit.rest.teams.list, {
    org: classroom.organisation,
    per_page: 100,
  })) as Team[];
  //Filter teams that don't have the correct repository
  classroom.teams = await asyncFilter(teams, async (team) => {
    const { data: repositories } = await octokit.rest.teams.listReposInOrg({
      team_slug: team.slug,
      org: classroom.organisation,
    });
    const repository = repositories.find((repo) =>
      repo.name.startsWith(classroom.repositoryPrefix)
    );

    if (repository?.name) {
      //get commits from repository
      const { data: commits } = await octokit.rest.repos.listCommits({
        owner: classroom.organisation,
        repo: repository.name,
      });
      if (commits.length > 0) {
        team.repository = repository?.name || "";
        classroom.repository.set(team.slug, repository);
        return true;
      }
    }
    return false;
  });
  console.log("Got %d teams", classroom.teams.length);
  console.log("Got %d repositorys", classroom.repository.size);
  classroom.teams = teams;
  return teams;
}

// Get the source code for all the teams
async function getWriteContent(
  team: string,
  repositoryName: string,
  path: string
): Promise<void> {
  try {
    const { data: file } = await octokit.rest.repos.getContent({
      owner: classroom.organisation,
      repo: repositoryName,
      path: `src/${path}`,
      ref: "main",
    });
    if (file instanceof Array && file[0].type === "file") {
      return await writeFile(
        `./repositories/${team}/${file[0].name}`,
        Buffer.from(file[0].content || "", "base64")
      );
    }
  } catch (e) {
    console.log(e);
    return Promise.resolve();
  }
}

async function getSourceCode(octokit: Octokit) {
  for (const [team, repository] of classroom.repository) {
    mkdir(`./repositories/${team}`, { recursive: true });
    const { data: files } = await octokit.rest.repos.getContent({
      owner: classroom.organisation,
      repo: repository.name,
      path: "src",
      ref: "main",
    });
    if (files instanceof Array) {
      for (const file of files) {
        const time = new Date().getTime();
        await getWriteContent(team, repository.name, file.name);
        while (new Date().getTime() - time < 30) {}
      }
    }
  }
}

async function getRooster(octokit: Octokit) {
  //Get all teams
  if (classroom.teams === undefined) await getAllTeams(octokit);
  for (const team of classroom.teams) {
    //Get list of repositories of a team
    const { data: members } = await octokit.rest.teams.listMembersInOrg({
      team_slug: team.slug,
      org: classroom.organisation,
    });
    for (const member of members) {
      console.log(`${member.login} is a member of ${team.repository}`);
    }
  }
  return true;
}
//For each folder in the repositories folder, append all files into a single file
async function prepareDolos() {
  await mkdir(`./dolos`, { recursive: true });
  const folders = await readdir(`./repositories`);
  for (const folder of folders) {
    try {
      let files = await readdir(`./repositories/${folder}`);
      files = files.sort();
      const content = await Promise.all(
        files.map(async (file) =>
          readFile(`./repositories/${folder}/${file}`, "utf8").then(
            (data) => `/*${file}*/\n\n ${data}`
          )
        )
      );
      writeFile(
        `./dolos/${folder}-sources.c`,
        content.sort().join("\n\n"),
        "utf8"
      );
    } catch (error) {
      //Print the name of the team with an error
      console.log(`${folder} error ${error}`);
    }
  }
}

async function testConnection(octokit: Octokit) {
  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  console.log(process.env.GITHUB_TOKEN);
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login);
  const { headers } = await octokit.request("HEAD /");
  if (headers) {
    const scopes = headers["x-oauth-scopes"]
      ?.split(", ")
      .filter((str) => str.length > 0);
    if (scopes?.length == 0) {
      console.error("Github token not set");
      console.error("export GITHUB_TOKEN=<token>");
      process.abort();
    }
  }
}

console.log("Running Test Connection");
if (process.argv.length > 2) {
  await run(process.argv[2]);
} else {
  await run("test");
  //await run("teams");
  // await run("rooster");
  await run("source");
  await prepareDolos();
}
