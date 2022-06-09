'''
Created on 1 Jun 2022

@author: w.delamare
'''


import re
import os
import sys
import getopt
import time

# https://pygithub.readthedocs.io/en/latest/introduction.html
from github import Github


'''
To run the script outside Eclipse
(otherwise import pbms)
'''
PACKAGE_PARENT = '..'
SCRIPT_DIR = os.path.dirname(os.path.realpath(os.path.join(os.getcwd(), os.path.expanduser(__file__))))
sys.path.append(os.path.normpath(os.path.join(SCRIPT_DIR, PACKAGE_PARENT)))
os.chdir(SCRIPT_DIR)



def PrintHelp():
    print('python Main.py -t <git_token> -r <git_repo>')
    print("-t --token: mandatory (default: env variable)")
    print("-r --repo: mandatory (default: 'Estia-1a/test-issues'")



def main(argv):
    git_token = ""
    git_repo = ""

    created_issues = 0

    try:
        opts, args = getopt.getopt(argv,"ht:r:",["token=","repo="])
    except getopt.GetoptError as e:
        print(e)
        PrintHelp()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            PrintHelp()
            sys.exit()
        elif opt in ("-t", "--token"):
            git_token = arg
        elif opt in ("-r", "--repo"):
            git_repo = arg

    if len(git_repo) == 0 or len(git_token) == 0:
        # this is running on a machine
        # in this case, best to have a tasks.json file to run in VSCode
        print("problem occured with arguments: ", opts)
        PrintHelp()
        sys.exit(2)

    g = Github(git_token)

    # get the template repo
    repo = g.get_repo("Estia-1a/projetGenieInfo_template")
    
    # and all issues
    # sort = **"created"**, "updated", "comments"
    # direction = "asc", **"desc"**
    g_issues = repo.get_issues(state='all')
    
    
    # get the student repo
    repo_target = g.get_repo(git_repo)

    # default label for created issues
    try:
        repo_target.get_label("feature")
    except:
        repo_target.create_label(name = "feature", color="eba444", description="Automatic feature")
    
    # get all milestones and issues already in  the target repo
    target_milestones = repo_target.get_milestones()
    t_milestones = [t.title for t in target_milestones]
    target_issues = repo_target.get_issues(state="all")
    t_issues = [i.title for i in target_issues]

    # to save data to log
    dico = []

    # create issues with the `export` label
    label_export = repo.get_label("export")

    # main loop!
    should_sleep = True
    for gi in g_issues:
        if label_export in gi.labels:
            # take care of labels first
            for lab in gi.labels:
                try:
                    repo_target.get_label(lab.name)
                except:
                    print(lab.name, lab.color, lab.description)
                    repo_target.create_label(name = lab.name, color=lab.color, description="" + str(lab.description))

            # check if the milestone exists in the target repo
            if gi.milestone.title not in t_milestones:
                # create milestone
                print("creating milestone " + gi.milestone.title)
                milestone = repo_target.create_milestone(title=gi.milestone.title, state="open", description=gi.milestone.description)
                t_milestones.append(milestone.title)
                target_milestones = repo_target.get_milestones()
            else:
                milestone = [x for x in target_milestones if x.title == gi.milestone.title][0]

            # finally create issue
            if gi.title not in t_issues:
                val = repo_target.create_issue(title = gi.title, body = gi.body, milestone=milestone, labels=gi.labels)
                print("creating issue " + val.title, val.number)
                created_issues += 1
                should_sleep = True
            else:
                val = [x for x in target_issues if x.title == gi.title][0]
                if gi.title != val.title or gi.body != val.body or gi.milestone.title != val.milestone.title or [l.name for l in gi.labels] != [l.name for l in val.labels]:
                    print("updating issue " + gi.title)
                    val.edit(title=gi.title, body=gi.body, milestone=milestone, labels=[l.name for l in gi.labels])
                    should_sleep = True
                else:
                    should_sleep = False

            # keep track of issue index / feature index
            # for .github/issues.json
            cmd = re.findall("Command\s*\|\s*`-c\s+(.*?)[\s|`]", val.body)
            dico.append({"id": val.number, "command": cmd[0], "title": val.title})
            if should_sleep:
                time.sleep(0.1)


    
    # write and add file
    print("creating .github/issues.json file")
    try:
        contents = repo_target.get_contents(".github/issues.json", ref="main")
        repo_target.update_file(path=contents.path, content=str(dico), message="Updating issue mapping", sha=contents.sha, branch="main")
    except:
        repo_target.create_file(path = ".github/issues.json", content = str(dico), message="Creating issue mapping.", branch="main")

    print(str(created_issues) + "/" + str(len(dico)) + " issues created and mapped.")
    return



if __name__ == '__main__':
    main(sys.argv[1:])
    
