cmake_minimum_required(VERSION 3.20)
project(estia-image VERSION 1.0.1 DESCRIPTION "estia-image libray to open and write image files")
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
        ARCHIVE DESTINATION ${CMAKE_SOURCE_DIR}/lib
        PUBLIC_HEADER DESTINATION  ${CMAKE_SOURCE_DIR}/include
)

## MAC AND LINUX
# Probably only useful for mac and linux
include(GNUInstallDirs)
# Only for release, probably only useful for mac and linux
configure_file(estia-image.pc.in estia-image.pc @ONLY)
# Release version for Mac and Linux
install(TARGETS estia-image
        CONFIGURATIONS Release
        ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
        PUBLIC_HEADER DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}
)
install(FILES ${CMAKE_BINARY_DIR}/estia-image.pc
    CONFIGURATIONS Release
    DESTINATION ${CMAKE_INSTALL_DATAROOTDIR}/pkgconfig)
