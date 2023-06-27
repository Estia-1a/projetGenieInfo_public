ROOT_DIR=$(readlink -f ../..)
DESTINATION_DIR=$ROOT_DIR/packages/classAdministrator/pgi-$(date '+%Y')
INSTALL_DIR=$DESTINATION_DIR/executables
ERROR_DIR=$DESTINATION_DIR/errors
WARNING_DIR=$DESTINATION_DIR/warnings


## While there is argument in the command line echo the argument and remove it from the command line
while [ $# -gt 0 ]
do
    cd $1 
    ## Check if the current directory is a git repository
    if [ ! -d .git ]
    then
        echo -e "\033[31m$(basename $1) is not a git repository\033[0m"
        shift
        continue
    fi
    
    # git reset --hard origin/main --quiet
    ## Copy the right makefile 
    cp $ROOT_DIR/CMake/CMakeLists.txt .
    ## Clean Configuration
    rm -rf build 
    ## Configure cmake
    cmake \
        -D ESTIA_IMAGE_PATH="$ROOT_DIR/estia-image/estia-image/" \
        -D GETOPT_PATH="$ROOT_DIR/getopt/getopt/" \
        -D INSTALL_DIR=$INSTALL_DIR/$(basename $1)\
        -B build .  > /dev/null 
    ## Build
    cmake --build build --target install > /dev/null 2> error.log
    #Check if there is an error in the build or if freud is not installed
    if [ ! -f $INSTALL_DIR/$(basename $1)/freud ]
    then
        # PRint error in red 
        echo -e "\033[31mError in the build of $(basename $1)\033[0m"
        mkdir -p $ERROR_DIR/$(basename $1)
        cp  error.log  $ERROR_DIR/$(basename $1)/error.log        
    else
        # if there is error in the log move it to the error folder
        if [ -s error.log ]
        then
            #echo Build of $(basename $1) is OK in yellow
            echo -e "\033[33mBuild of $(basename $1) is Ok with warning\033[0m"
            mkdir -p $WARNING_DIR/$(basename $1)
            cp  error.log $WARNING_DIR/$(basename $1)/error.log
        else 
            #print build of $(basename $1) is OK in green
            echo -e "\033[32mBuild of $(basename $1) is OK\033[0m"
        fi  
    fi
    cd - > /dev/null
    shift
done