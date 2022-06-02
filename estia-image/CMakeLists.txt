cmake_minimum_required(VERSION 3.20)
project(estia-image VERSION 2.0.1 DESCRIPTION "estia-image libray to open and write image files")
set(INSTALL_DESTINATION ${CMAKE_SOURCE_DIR}/estia-image CACHE STRING "Install directory")

# The meat of the cmake file
add_library(estia-image STATIC src/estia-image.c)
set_target_properties(estia-image PROPERTIES
    VERSION ${PROJECT_VERSION}
    SOVERSION 1
    PUBLIC_HEADER src/estia-image.h)
# Well I should read more about that...
target_include_directories(estia-image PRIVATE .)
# Main configurations export directly to the source folder
install(TARGETS estia-image
        ARCHIVE DESTINATION ${INSTALL_DESTINATION}/lib
        PUBLIC_HEADER DESTINATION ${INSTALL_DESTINATION}/include
)
