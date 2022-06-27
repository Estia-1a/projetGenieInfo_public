export ESTIA_IMAGE_PATH=/workspaces/projetGenieInfo_public/estia-image/estia-image/
export GETOPT_PATH=/workspaces/projetGenieInfo_public/estia-image/getopt/getopt/

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
        -D INSTALL_DIR=/workspaces/projetGenieInfo_public/packages/classAdministrator/executables/$(basename $1)\
        -B build . 
    ## Build
    cmake --build build --target install 
    cd - 
    shift
done