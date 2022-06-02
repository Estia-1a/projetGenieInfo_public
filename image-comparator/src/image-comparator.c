#include <stdio.h>
#include <stdlib.h>

#include <estia-image.h>

// Just not to copy from utils.c inside the freud src/ folder
#define GET_PIXEL_R_DIF(data1, data2, x, y, n, width) ((data1[((y*width+x)*n)+0] - data2[((y*width+x)*n)+0]))
#define GET_PIXEL_G_DIF(data1, data2, x, y, n, width) ((data1[((y*width+x)*n)+1] - data2[((y*width+x)*n)+1]))
#define GET_PIXEL_B_DIF(data1, data2, x, y, n, width) ((data1[((y*width+x)*n)+2] - data2[((y*width+x)*n)+2]))

int main(int argc, char **argv)
{
  // Basic check of command-line arguments
  if(argc < 3) {
    printf("Error: missing at least one argument\n");
    printf("Usage: ./image-comparator filename1 filename2\n");
    exit(1);
  }

  // TODO: maybe further checks to make sure given files are valid image files

  // Get data from both files
  unsigned char *data1, *data2;
  int width1, width2;
  int height1, height2;
  int nb1, nb2;
  read_image_data(argv[1], &data1, &width1, &height1, &nb1);
  read_image_data(argv[2], &data2, &width2, &height2, &nb2);

  // Check if same dimensions; if so, exit
  if((width1 != width2) || (height1 != height2) || (nb1 != nb2)) {
    printf("0 Incorrect dimensions\n");
    return 0;
  }

  // Compute euclidian distance between files
  unsigned long long distance = 0;

  for(int y = 0; y < height1; y++) {
    for(int x = 0; x < width1; x++) {
      int r_dif = GET_PIXEL_R_DIF(data1, data2, x, y, nb1, width1);
      int g_dif = GET_PIXEL_G_DIF(data1, data2, x, y, nb1, width1);
      int b_dif = GET_PIXEL_B_DIF(data1, data2, x, y, nb1, width1);

      distance += (r_dif*r_dif) + (g_dif*g_dif) + (b_dif*b_dif);
    }
  }
  distance *= 100 ;
  distance /= (width1 * width2 * nb1);
  distance /= (255*255);
  int score = 100 - distance ; // Normalize to give a percentage between 0 and 100

  // TODO: define what the threshold above which distance is acceptable should be

  printf("%d\n", score);

  return 0;
}
