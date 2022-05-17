#define STB_IMAGE_WRITE_IMPLEMENTATION
#define STB_IMAGE_IMPLEMENTATION
#include "imageLib.h"

int readImage(const char *filename, unsigned char **data, int *width, int *height, int *nbChannels)
{
    *data = stbi_load(filename, width, height, nbChannels, 0);

    return 0; //TODO : Put defensive programming checkups everywhere
}

int writeImage(const char *filename, unsigned char *data, int width, int height)
{
    // TODO: consider if we also allow changing the file type, quality or encoding

    stbi_write_jpg(filename, width, height, RGB_COMP, data, 85);

    return 0;
}

int freeImage(unsigned char *data)
{
    stbi_image_free(data);

    return 0;
}

