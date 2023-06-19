cmake_minimum_required(VERSION 3.16)
project(getopt VERSION 1.0.1 DESCRIPTION "getopt library to ease the reading and wrinting of paremeters")
set(INSTALL_DESTINATION ${CMAKE_SOURCE_DIR}/getopt CACHE STRING "Install directory")
# The meat of the cmake file
add_library(getopt STATIC src/getopt.c)
set_target_properties(getopt PROPERTIES
    VERSION ${PROJECT_VERSION}
    SOVERSION 1
  PUBLIC_HEADER src/getopt.h)

# Main configurations export directly to the source folder
install(TARGETS getopt
        ARCHIVE DESTINATION ${INSTALL_DESTINATION}/lib
        PUBLIC_HEADER DESTINATION ${INSTALL_DESTINATION}/include
)
