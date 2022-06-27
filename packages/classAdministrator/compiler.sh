DESTINATION_DIR=/workspaces/projetGenieInfo_public/packages/classAdministrator/pgi-2022
INSTALL_DIR=$DESTINATION_DIR/executables
ERROR_DIR=$DESTINATION_DIR/errors
WARNING_DIR=$DESTINATION_DIR/warnings

## While there is argument in the command line echo the argument and remove it from the command line
while [ $# -gt 0 ]
do
    cd $1 
    ## Copy the right makefile 
    cp /workspaces/projetGenieInfo_public/CMake/CMakeLists.txt .
    ## Clean Configuration
    rm -rf build 
    ## Configure cmake
    cmake \
        -D ESTIA_IMAGE_PATH="/workspaces/projetGenieInfo_public/estia-image/estia-image/" \
        -D GETOPT_PATH="/workspaces/projetGenieInfo_public/getopt/getopt/" \
        -D INSTALL_DIR=$INSTALL_DIR/$(basename $1)\
        -B build .  > /dev/null 
    ## Build
    cmake --build build --target install > /dev/null 2> error.log
    #Check if there is an error in the build or if freud is not installed
    if [ ! -f $INSTALL_DIR/$(basename $1)/freud ]
    then
        # PRint error in red 
        echo -e "\e[31mError in the build of $(basename $1)\e[0m"
        mkdir -p $ERROR_DIR/$(basename $1)
        cp  error.log  $ERROR_DIR/$(basename $1)/error.log        
    else
        # if there is error in the log move it to the error folder
        if [ -s error.log ]
        then
            #echo Build of $(basename $1) is OK in yellow
            echo -e "\e[33mBuild of $(basename $1) is Ok with warning\e[0m"
            mkdir -p $WARNING_DIR/$(basename $1)
            cp  error.log $WARNING_DIR/$(basename $1)/error.log
        else 
            #print build of $(basename $1) is OK in green
            echo -e "\e[32mBuild of $(basename $1) is OK\e[0m"
        fi  
    fi
    cd - > /dev/null
    shift
done