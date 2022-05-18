#ifndef IMAGE_LIB_H
#define IMAGE_LIB_H

/**
 * Return some data about an image file
 * @param[in] filename Name of the file to be open
 * @param[out] data Reference to the pointer that points to the pixel array
 * @param[out] width Width of the image
 * @param[out] height Height of the image
 * @param[out] channel_count Number of channels
 * @return 0 on failure and non-0 on success.
 */
int read_image_data(const char *filename, unsigned char **data, int *width, int *height, int *channel_count);

/**
 * Writes into a png image file
 * @param[in] filename Name of the file to be written into
 * @param[in] data Reference to the pixel array to be written
 * @param[in] width Width of the image
 * @param[in] height Height of the image
 * @return 0 on failure and non-0 on success.
 */
int write_image_data(const char *filename, unsigned char *data, int width, int height);

/**
 * Frees stbi-related buffers and resources
 * @param[in] data The buffer allocated by readImageData buffer to be freed
 */
void free_image_data(unsigned char *data);

#endif
