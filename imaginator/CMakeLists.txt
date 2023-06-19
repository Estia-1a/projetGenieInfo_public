cmake_minimum_required(VERSION 3.16)
project(image-comparator VERSION 1.0.1 DESCRIPTION "Generate images for test purposes")
set(INSTALL_DESTINATION ${CMAKE_SOURCE_DIR}/dist CACHE STRING "Install directory")

# Set everything to use our image library
set(ESTIA_IMAGE_PATH ${CMAKE_SOURCE_DIR}/lib/estia-image/estia-image CACHE STRING "estia_image directory")
# Include directory
include_directories( ${ESTIA_IMAGE_PATH}/include )

# Add executable
add_executable(imaginator-random random/main.c)
add_executable(imaginator-base base/main.c)

# Find the Library
find_library(ESTIA_IMAGE_LIB
    NAMES estia-image
    HINTS "${ESTIA_IMAGE_PATH}/lib"
)

# Link it
target_link_libraries(imaginator-random PUBLIC ${ESTIA_IMAGE_LIB})
target_link_libraries(imaginator-base PUBLIC ${ESTIA_IMAGE_LIB})

# For some reason, on Linux, I need to explicitly link the standard math library, otherwise there is a linking error (same on the freud CMakeLists by the way)
if(UNIX AND NOT APPLE)
  target_link_libraries(imaginator-random PUBLIC m)
  target_link_libraries(imaginator-base PUBLIC m)
endif()

# Install
install(TARGETS imaginator-random
        RUNTIME DESTINATION ${INSTALL_DESTINATION}
)
# Install
install(TARGETS imaginator-base
        RUNTIME DESTINATION ${INSTALL_DESTINATION}
)