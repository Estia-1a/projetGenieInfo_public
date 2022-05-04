# Github Workflows

A workflow is a configurable automated process that will run one or more jobs when triggered by :
 - an event in the repository
 - Manually by the teacher / students
 - schedule

Workflows are defined by a YAML file in the .github/workflows directory in the repository.

## List of workflows

### Evaluating students

#### Process
Evaluation of the students code is done in the following way :
1. checking out the code on the master/main branch
2. compiling the code
3. running the test suites using the [evaluator](/actions/evaluator/README.md)
4. reporting
#### Triggers
- PullRequest ?
- Scheduled : every day ?
- Manually ?

### Importing Features/issues

#### Process
Copy issues either from a json file somewhere or from the template-repository ?

1. Use the action [issue-mover](/actions/issue-mover/README.md)

#### Triggers
- On project creation ?
- Manually when instructed by teachers ?
