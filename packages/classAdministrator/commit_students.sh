#!/bin/bash

# Parse command line arguments
while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        -o|--out)
        OUT="$2"
        shift
        shift
        ;;
        *) # unknown option
        SRC="$1"
        shift
        ;;
    esac
done

# Set default output file name
if [ -z "$OUT" ]
then

    OUT="commits_students-$(date '+%Y-%m-%d').csv"
fi
cwd=$(pwd)
OUT="$cwd/$OUT"
# Create output file with header row
echo "Author,Commiter, email, repo, Parents, Subject" > "$OUT"

# Loop through repositories in src folder
for repo in "$SRC"/*
do
    # check that repo is a directory containing a .git folder
    if [ ! -d "$repo/.git" ]
    then
        continue
    fi
    # Get repository name
    repo_name=$(basename "$repo")
    team=${repo_name#pgi-*-}
    # Loop through commits in repository
    cd "$repo"
    #echo "#Processing $repo_name">> "$OUT"
    
    git log --pretty=format:"%an,%cn,%ae,$team,\"%p\",\"%-s\",%ci" >> "$OUT"
    # echo empty csv line
    echo "" >> "$OUT"
    cd - >> /dev/null;
done