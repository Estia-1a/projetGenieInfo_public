#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>


#include <estia-image.h>
#include <getopt.h>

unsigned char* estia_image_random(int width, int height ) ; 

int main(int argc, char **argv) {

    unsigned char *imageData ; 

    int width, height ;

    // 5 times
    int i ;
    for (i = 0 ; i < 5 ; i++) {
        // Generate random size
        width = rand() % 100 ;
        height = rand() % 100 ;
        // Generate image
        imageData = estia_image_random(width, height) ;
        //write width and height to string
        char *filename = malloc(sizeof(char) * 64) ;
        sprintf(filename, "random_%dx%d.bmp", width, height) ;
        //writeImage
        write_image_data(filename, imageData, width, height ) ;
        free_image_data(imageData) ;
    }

}
/**
 * @brief Construct a new random image of the given size
 * 
 */
unsigned char * estia_image_random(int width, int height) {
    unsigned char *imageData ; 
    imageData = (unsigned char *)malloc(width * height * 3) ;
    int i ;
    for (i = 0 ; i < width * height * 3 ; i++) {
        imageData[i] = rand() % 256 ;
    }
    return imageData ;
}
