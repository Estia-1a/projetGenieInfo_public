
export INPUT_TESTSDIRECTORY=/workspaces/projetGenieInfo_public/images
export INPUT_COMPARATORPATH=/workspaces/projetGenieInfo_public/image-comparator/dist/image-comparator
export INPUT_EXECUTABLENAME=freud
export INPUT_BUILDDIRECTORY=.
EVALDIR=/workspaces/projetGenieInfo_public/packages/classAdministrator/pgi-2022/eval

#Clean Eval directory if exist
if [ -d $EVALDIR ]
then
    rm -rf $EVALDIR
fi
# Create necessary hierarchy
mkdir -p  $EVALDIR/md
mkdir -p  $EVALDIR/json
# For all the student executable run the evaluator
while [ $# -gt 0 ]
do
    # Move to the student executable directory
    cd $1 
    name=$(basename $1)
    rm -rf result 
    node /workspaces/projetGenieInfo_public/actions/evaluator/dist/index.js  | grep "Summary::" | sed  --expression="s/Summary::/$name, /g" - >> $EVALDIR/all.csv 
    cp ./result/*/log_*.json  $EVALDIR/json/$name.json
    cp ./result/*/*.md  $EVALDIR/md/$name.md
    cd - > /dev/null
    shift
done