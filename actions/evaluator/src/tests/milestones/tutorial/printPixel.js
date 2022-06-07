export default [

  {
    feature: "print_pixel",
    name: "Get Pixel(0,0) : 0,0,0",
    description: "Get the first pixel on 8x8 image",
    type: "stdout",
    input: ["input/get_pixel_x0_y0_n_8x8.bmp"],
    options: ["-c", "print_pixel"
             , "0", "0" ],
    output: "[Pp]rint_pixel\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*0\\s*,\\s*0,\\s*0"
  },

  {
    feature: "print_pixel",
    name: "Get Pixel(2,3) : 20,30,26",
    description: "Get the pixel of coordinate 2,3 on 8x8 image",
    type: "stdout",
    input: ["input/get_pixel_x0_y0_n_8x8.bmp"],
    options: ["-c", "print_pixel"
             , "2", "3" ],
    output: "[Pp]rint_pixel\\s*\\(\\s*2\\s*,\\s*3\\s*\\)\\s*:\\s*20\\s*,\\s*30,\\s*26"
  }
  ,


  {
    feature: "print_pixel",
    name: "Get Pixel(3,2) : 30,20,19",
    description: "Get the pixel of coordinate 2,3 on 8x8 image",
    type: "stdout",
    input: ["input/get_pixel_x0_y0_n_8x8.bmp"],
    options: ["-c", "print_pixel"
             , "3", "2" ],
    output: "[Pp]rint_pixel\\s*\\(\\s*3\\s*,\\s*2\\s*\\)\\s*:\\s*30\\s*,\\s*20,\\s*19"
  }
  ,
  {
    feature: "print_pixel",
    name: "Get Pixel(7,7) : 0,0,0",
    description: "Get the pixel of coordinate 7,7 on 8x8 image",
    type: "stdout",
    input: ["input/get_pixel_x0_y0_n_8x8.bmp"],
    options: ["-c", "print_pixel"
             , "7", "7" ],
    output: "[Pp]rint_pixel\\s*\\(\\s*7\\s*,\\s*7\\s*\\)\\s*:\\s*70\\s*,\\s*70,\\s*63"
  }


];
