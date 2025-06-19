cmake_minimum_required(VERSION 3.16)
project(image-comparator VERSION 1.0.1 DESCRIPTION "Small utility that tells how different two given images are")
set(INSTALL_DESTINATION ${CMAKE_SOURCE_DIR}/dist CACHE STRING "Install directory")

# Set everything to use our image library
set(ESTIA_IMAGE_PATH ${CMAKE_SOURCE_DIR}/lib/estia-image/estia-image CACHE STRING "estia_image directory")
#set(ESTIA_IMAGE_PATH ${CMAKE_SOURCE_DIR}/../estia-image)

# Include directory
include_directories( ${ESTIA_IMAGE_PATH}/include )

# Add executable
add_executable(image-comparator src/image-comparator.c)

# Find the Library
find_library(ESTIA_IMAGE_LIB
    NAMES estia-image
    HINTS "${ESTIA_IMAGE_PATH}/lib"
)

# Link it
target_link_libraries(image-comparator PUBLIC ${ESTIA_IMAGE_LIB})

# For some reason, on Linux, I need to explicitly link the standard math library, otherwise there is a linking error (same on the freud CMakeLists by the way)
if(UNIX AND NOT APPLE)
  target_link_libraries(image-comparator PUBLIC m)
endif()

# Install
install(TARGETS image-comparator
        RUNTIME DESTINATION ${INSTALL_DESTINATION}
)
