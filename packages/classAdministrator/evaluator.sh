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
do 
    echo $(basename $folder) >> $EVALDIR/all.csv
done
    

# For all the student executable run the evaluator
while [ $# -gt 0 ]
do
    # Move to the student executable directory
    cd $1 
    name=$(basename $1)
    rm -rf result 
    echo $name
    
    # run the evaluator, kill it after 10 seconds
    set -o pipefail
    # timeout 3 node $ROOT_DIR/actions/evaluator/index.js 
    node $ROOT_DIR/actions/evaluator/index.js  | grep "Summary::" | sed  -e "s/Summary::/$name, /g" >> $EVALDIR/all.csv     
    # if the evaluator is killed print timeout
    if [ $? -gt 124 ]
    then
        echo "Timeout"
        echo "$name,Timeout" >> $EVALDIR/all.csv
    else
        cp ./result/*/log_*.json  $EVALDIR/json/$name.json
        cp ./result/*/*.md  $EVALDIR/md/$name.md
    fi


    cd - > /dev/null
    shift
done

#clean the csv so that every other column is removed (labels)
cat $EVALDIR/all.csv | cut -d ',' -f 1,2,3,4,5,6,7,8,9,10,11,12 > $EVALDIR/summary.csv

