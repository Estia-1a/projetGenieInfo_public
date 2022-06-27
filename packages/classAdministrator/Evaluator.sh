
export INPUT_TESTSDIRECTORY=/workspaces/projetGenieInfo_public/images
export INPUT_COMPARATORPATH=/workspaces/projetGenieInfo_public/image-comparator/dist/image-comparator
export INPUT_EXECUTABLENAME=freud

mkdir -p $(dirname $1)/results/md
mkdir -p $(dirname $1)/results/json

while [ $# -gt 0 ]
do
    export INPUT_BUILDDIRECTORY=.
    cd $1 
    name=$(basename $1)
    rm -rf result 
    node /workspaces/projetGenieInfo_public/actions/evaluator/dist/index.js  | grep "::set-output name=grade" | sed  --expression="s/::set-output name=grade::/$name /g" - >> ../results/all 
    cp ./result/*/log_*.json ../results/json/$(basename $1).json
    cp ./result/*/*.md ../results/md/_$(basename $1).md
    cd -
    shift
done