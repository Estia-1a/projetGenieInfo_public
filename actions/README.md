# Actions

Actions are used by [workflows](/workflows/README.md)

## List of Actions

### Evaluator
Run tests on student's compiled code and report which features/issues are implemented

[See more about the evaluator](./evaluator/README.md)
### Issue-mover
Copy the set of features from "Estia-1a/projetGenieInfo_template" as issues in the students' repository.
Note that:

* Issues should have the `export` label. All other labels (and their color) will also be transferred to the students' repository.
* Issues **have to** be associated to a milestone. Milestones will automatically be created in the students' repository if they do not exist.
* Issues **have to** include the command name in their description such as: Command | `-c the_cmd_name`
* The repository **has to** have at least the `main` branch. Otherwise, the API does not allow the creation of new branches.
* The script creates (and updates at each run) the `.github/issues.json` file. For now, the file only exists in the `issues-creation` branch.
* The script should run (i) at the project's creation, or (ii) manually.
* The `template` repository (with original issues and milestones) **has to** be public.

## Useful Doc
- [octokit api](https://octokit.github.io/rest.js/v18#issues)
- [source javascript action use for this Evaluation action ](https://github.com/actions/javascript-action)
- [pygithub](https://pygithub.readthedocs.io/en/latest/)

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: actions/javascript-action@v1
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
