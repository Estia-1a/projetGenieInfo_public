ROOT_DIR=$(readlink -f ../..)
export INPUT_TESTSDIRECTORY=$ROOT_DIR/images
export INPUT_COMPARATORPATH=$ROOT_DIR/image-comparator/dist/image-comparator
export INPUT_EXECUTABLENAME=freud
export INPUT_BUILDDIRECTORY=.
EVALDIR=$ROOT_DIR/packages/classAdministrator/pgi-$(date '+%Y')/eval

#Clean Eval directory if exist
if [ -d $EVALDIR ]
then
    rm -rf $EVALDIR
fi
# Create necessary hierarchy
mkdir -p  $EVALDIR/md
mkdir -p  $EVALDIR/json
#for all the folder in the error directory print the name of the folder
for folder in $ROOT_DIR/packages/classAdministrator/pgi-$(date '+%Y')/errors/*

# For all the student executable run the evaluator
while [ $# -gt 0 ]
do
    # Move to the student executable directory
    cd $1 
    name=$(basename $1)
    rm -rf result 
    echo $name
    node $ROOT_DIR/actions/evaluator/dist/index.js  | grep "Summary::" | sed  -e "s/Summary::/$name, /g" >> $EVALDIR/all.csv 
    cp ./result/*/log_*.json  $EVALDIR/json/$name.json
    cp ./result/*/*.md  $EVALDIR/md/$name.md
    cd - > /dev/null
    shift
done