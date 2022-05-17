#ifndef IMAGE_LIB_H
#define IMAGE_LIB_H

//Defined in image lib
#define RGB_COMP 3

/**
 * Return some data about an image file
 * @param[in] filename Name of the file to be open
 * @param[out] data Reference to the pointer that points to the pixel array
 * @param[out] width Width of the image
 * @param[out] height Height of the image
 * @param[out] nbChannels Number of channels
 * @param[out] nbChannels Number of channels
 */
int readImage(const char *filename, unsigned char **data, int *width, int *height, int *nbChannels);

/**
 * Writes into a png image file
 * @param[in] filename Name of the file to be written into
 * @param[in] data Reference to the pixel array to be written
 * @param[in] width Width of the image
 * @param[in] height Height of the image
 */
int writeImage(const char *filename, unsigned char *data, int width, int height);

/**
 * Frees stbi-related buffers and resources
 * @param[in] data The stbi-allocated buffer to be freed
 */
int freeImage(unsigned char *data);

#endif
