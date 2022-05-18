cmake_minimum_required(VERSION 3.20)
project(getopt VERSION 1.0.1 DESCRIPTION "getopt library to ease the reading and wrinting of paremeters")
# The meat of the cmake file
add_library(getopt STATIC src/getopt.c)
set_target_properties(getopt PROPERTIES
    VERSION ${PROJECT_VERSION}
    SOVERSION 1
  PUBLIC_HEADER src/getopt.h)

# Main configurations export directly to the source folder
install(TARGETS getopt
        ARCHIVE DESTINATION ${CMAKE_SOURCE_DIR}/getopt/lib
        PUBLIC_HEADER DESTINATION  ${CMAKE_SOURCE_DIR}/getopt/include
)
