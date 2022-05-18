#define STB_IMAGE_WRITE_IMPLEMENTATION
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
#include "stb_image_write.h"
#include "estia-image.h"

int read_image_data(const char *filename, unsigned char **data, int *width, int *height, int *nbChannels)
{
    *data = stbi_load(filename, width, height, nbChannels, 0);

    return 0; //TODO : Put defensive programming checkups everywhere
}

int write_image_data(const char *filename, unsigned char *data, int width, int height)
{
    // TODO: consider if we also allow changing the file type, quality or encoding

    stbi_write_jpg(filename, width, height, RGB_COMP, data, 85);

    return 0;
}

int free_image_data(unsigned char *data)
{
    stbi_image_free(data);

    return 0;
}
