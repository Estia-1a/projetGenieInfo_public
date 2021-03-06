# projetGenieInfo_public

This repository contains all about the projet Genie Informatique but : 
- The source code for the [prof solution](https://github.com/Estia-1a/projetGenieInfo_prof)
- The template code for the students to start with. ([template repository to be created](https://github.com/Estia-1a/projetGenieInfo_template))

# Wiki 

The wiki contains the information about the project for the students

## Image Data Structure

To manipulate image, you will have to use an 'unsigned char *' which points to the pixel data. 
The pixel data consists of HEIGHT lines of WIDTH pixels, with each pixel consisting of N components. 
In our case, we will use N = 3 for RGB components.
The first pixel pointed to is top-left-most in the image.

<img src="https://user-images.githubusercontent.com/16139930/171210679-1f662b91-2963-4258-8088-f3242b540dee.png#gh-dark-mode-only" width="550">
<img src="https://user-images.githubusercontent.com/16139930/171420839-38593c04-012c-437e-93f3-52fe8e2f662c.png#gh-light-mode-only" width="550">

Data is stored in an unsigned char buffer in row-order of a (WIDTH * HEIGHT * N) size.

<img src="https://user-images.githubusercontent.com/16139930/171215394-31282ff2-4c9e-479f-9d59-b709cc91c287.png#gh-dark-mode-only" width="550">
<img src="https://user-images.githubusercontent.com/16139930/171420795-ed17f434-4ce5-4341-b4e4-fb1a085c6f84.png#gh-light-mode-only" width="550">

You have to use predefined functions to read and write images. 
```c
int read_image_data(const char *filename, unsigned char **data, int *width, int *height, int *nbChannels);
int write_image_data(const char *filename, unsigned char *data, int width, int height);
```
- filename: image file path
- data: unsigned char buffer in row-order of a (WIDTH * HEIGHT * nbChannels) size
- width: image width
- height: image height
- nbChannels: N components of each pixel

# Issues

Issues are used by : 
- The teaching team to manage the project (create new features, prepare the class etc).
- The Students to report bugs or possible enhancement to the class. 

# Contribute
