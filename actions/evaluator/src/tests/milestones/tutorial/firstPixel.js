export default [
  {
    feature: "first_pixel",
    name: "First Pixel 64x64 Red : 255, 0, 0",
    description: "Check first pixel on 64x64 : should be red",
    type: "stdout",
    input: ["input/rgbw_64x64.bmp"],
    options: ["-c", "first_pixel"],
    output: "[fF]irst_pixel\\s*:\\s*255\\s*,\\s*0,\\s*0"
  },

  {
    feature: "first_pixel",
    name: "First Pixel Red : 255, 0, 0",
    description: "Check first pixel on 32x32 red image",
    type: "stdout",
    input: ["input/r_32x32.bmp"],
    options: ["-c", "first_pixel"],
    output: "[fF]irst_pixel\\s*:\\s*255\\s*,\\s*0,\\s*0"
  },

  {
    feature: "first_pixel",
    name: "First Pixel Green : 0, 255, 0",
    description: "Check first pixel on 32x32 green image",
    type: "stdout",
    input: ["input/g_32x32.bmp"],
    options: ["-c", "first_pixel"],
    output: "[fF]irst_pixel\\s*:\\s*0\\s*,\\s*255,\\s*0"
  },

  {
    feature: "first_pixel",
    name: "First Pixel Blue : 0, 0, 255",
    description: "Check first pixel on 32x32 blue image",
    type: "stdout",
    input: ["input/b_32x32.bmp"],
    options: ["-c", "first_pixel"],
    output: "[fF]irst_pixel\\s*:\\s*0\\s*,\\s*0,\\s*255"
  }

  , {
    feature: "first_pixel",
    name: "First Pixel 1 2 3 : 1, 2, 3",
    description: "Check first pixel on 8x8 image",
    type: "stdout",
    input: ["input/first_pixel_1_2_3_8x8.bmp"],
    options: ["-c", "first_pixel"],
    output: "[fF]irst_pixel\\s*:\\s*1\\s*,\\s*2,\\s*3"
  }
];
