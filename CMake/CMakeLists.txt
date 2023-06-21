cmake_minimum_required(VERSION 3.15)
project(freud VERSION 1.0.1 DESCRIPTION "freud is an image analyst")
set(CMAKE_INSTALL_MESSAGE LAZY)
set(CMAKE_MESSAGE_LOG_LEVEL "ERROR")

# Set everything to use our image library
set(ESTIA_IMAGE_PATH ${CMAKE_SOURCE_DIR}/lib/estia-image/estia-image CACHE STRING "estia_image directory")
set(GETOPT_PATH ${CMAKE_SOURCE_DIR}/lib/getopt/getopt CACHE STRING "getopt directory")
set(INSTALL_DIR ${CMAKE_SOURCE_DIR}/dist CACHE STRING "install directory")
# Include directory
include_directories( ${ESTIA_IMAGE_PATH}/include )
include_directories( ${GETOPT_PATH}/include )

# Add executable files : NOTE it is a bad way of doing it since you would
# Need to rerun cmake . -B build to be sure they are in the correct folder
AUX_SOURCE_DIRECTORY(${CMAKE_SOURCE_DIR}/src/ SOURCE_FILES)
add_executable( freud ${SOURCE_FILES})

# Find the Library
find_library(ESTIA_IMAGE_LIB
    NAMES estia-image
    HINTS "${ESTIA_IMAGE_PATH}/lib"
    PATHS "${ESTIA_IMAGE_PATH}/lib"
)

# Find the Library
find_library(GETOPT_LIB
    NAMES getopt
    HINTS "${GETOPT_PATH}/lib"
    PATHS "${GETOPT_PATH}/lib"
)
# Link it
target_link_libraries( freud PUBLIC ${ESTIA_IMAGE_LIB})
target_link_libraries( freud PUBLIC ${GETOPT_LIB})

target_compile_options(freud PRIVATE -Wno-implicit-function-declaration )
include(CheckLibraryExists)

CHECK_LIBRARY_EXISTS(m sin "" HAVE_LIB_M)

if (HAVE_LIB_M)
    set(EXTRA_LIBS ${EXTRA_LIBS} m)
endif (HAVE_LIB_M)
target_link_libraries( freud PUBLIC ${EXTRA_LIBS})

install(TARGETS freud
        RUNTIME DESTINATION ${INSTALL_DIR}
)
