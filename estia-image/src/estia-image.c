#define STB_IMAGE_WRITE_IMPLEMENTATION
#define STB_IMAGE_IMPLEMENTATION
#include <string.h>
#include "stb_image.h"
#include "stb_image_write.h"
#include "estia-image.h"

//How many component per pixel RGB
#define RGB_COMP 3
//What Mode are availaible to write image
#define MODE_BMP 0
#define MODE_JPG 1
#define MODE_PNG 2

int read_image_data(const char *filename, unsigned char **data, int *width, int *height, int *nbChannels)
{
    *data = stbi_load(filename, width, height, nbChannels, 0);

    return 0; //TODO : Put defensive programming checkups everywhere
}

int write_image_data(const char *filename, unsigned char *data, int width, int height)
{
    char *extension =  strrchr(filename, '.') + 1;
    char mode = MODE_BMP ;

    //Check what the extension is
    if( strlen( extension ) < 3 ) mode = MODE_BMP ;
    else if( strncmp( extension, "bmp", 3 ) == 0 ) mode = MODE_BMP ;
    else if( strncmp( extension, "jpg", 3 ) == 0 ) mode = MODE_JPG ;
    else if( strncmp( extension, "jpeg", 4 ) == 0 ) mode = MODE_JPG ;
    else if( strncmp( extension, "png", 3 ) == 0 ) mode = MODE_PNG ;

    switch ( mode ) {
      case MODE_BMP:
        return stbi_write_bmp(filename, width, height, RGB_COMP, data);
      case MODE_JPG:
        return stbi_write_jpg(filename, width, height, RGB_COMP, data, 85);
      case MODE_PNG:
        return stbi_write_png(filename, width, height, RGB_COMP, data, width*RGB_COMP);
    }
    return 0;
}

int free_image_data(unsigned char *data)
{
    stbi_image_free(data);

    return 0;
}
