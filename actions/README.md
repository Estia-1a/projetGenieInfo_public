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
- [pygithub](https://pygithub.readthedocs.io/en/latest/)
