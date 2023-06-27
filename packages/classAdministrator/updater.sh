# This script goes through all the repositories in the given directory and 
# Update them to latest commit before a given date (default is today)
# Use getopts to parse the arguments

# Default values
REPOSITORY_DIR=''
DATE=$(date '+%Y-%m-%d')
BRANCH=main


# Parse the arguments
while getopts ":d:r:b:" opt; do
  case $opt in
    d)
      DATE=$OPTARG
      ;;
    r)
      REPOSITORY_DIR=$OPTARG
      ;;
    b)
      BRANCH=$OPTARG
    ;;
    h)
      echo "Usage: $0 [-d date] [-r repository_dir] [-b branch]" >&2
      echo "Default values are: date=$DATE, repository_dir=$REPOSITORY_DIR, branch=$BRANCH" >&2
      exit 1
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

# Check if the repository directory exists
if [ ! -d $REPOSITORY_DIR ]; then
  echo "Repository directory $REPOSITORY_DIR does not exist" >&2
  exit 1
fi

# Check if the date is valid
if ! gdate -d $DATE > /dev/null 2>&1; then
  echo "Invalid date: $DATE" >&2
  exit 1
fi

# Go to the repository directory
cd $REPOSITORY_DIR

echo "repo,number of commits, hash, date, message" > ./evaluation.csv

# For each repository
for repository in */; do
  # Go to the repository directory
  cd $repository

  # Get the repository name
  repository_name=$(basename $repository)

  # Fetch the latest commits
  git checkout $BRANCH --quiet
  git reset --hard origin/$BRANCH --quiet

  # Get the latest commit before the given date
  commit=$(git rev-list -n 1 --before="$DATE" --branches $BRANCH)

  # If there is a commit before the given date
  if [ ! -z $commit ]; then
    # Update the repository to the latest commit before the given date
    # if the branch "EVALUATION-$DATE" exist switch branch and update it to that commit otherwise create a new branch "EVALUATION-$DATE" and update it to that commit
    if git show-ref --verify --quiet refs/heads/EVALUATION-$DATE; then
      git checkout EVALUATION-$DATE --quiet
      git reset --hard $commit --quiet
    else
      git checkout -b EVALUATION-$DATE $commit --quiet
    fi
    # Echo repository name, number of commits on the branch, commit short hash, commit date, commit message, in the evaluation.csv file
    number_of_commits=$(git rev-list --count $commit)
    head_info=$(git log --oneline --pretty=format:"%h,%cd,%s" head -n 1)
    echo "$repository_name,$number_of_commits,$head_info" >> ../../update-$DATE.csv

  fi

  # Go back to the repository directory
  cd ..
done
