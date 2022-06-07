export default [
  {
    feature: "tenth_pixel",
    name: "Tenth Pixel Red : 255, 0, 0",
    description: "Check first pixel on 32x32 red image",
    type: "stdout",
    input: ["input/r_32x32.bmp"],
    options: ["-c", "tenth_pixel"],
    output: "[tT]enth_pixel\\s*:\\s*255\\s*,\\s*0,\\s*0"
  },

  {
    feature: "tenth_pixel",
    name: "Tenth Pixel Green : 0, 255, 0",
    description: "Check first pixel on 32x32 green image",
    type: "stdout",
    input: ["input/g_32x32.bmp"],
    options: ["-c", "tenth_pixel"],
    output: "[tT]enth_pixel\\s*:\\s*0\\s*,\\s*255,\\s*0"
  },

  {
    feature: "tenth_pixel",
    name: "Tenth Pixel Blue : 0, 0, 255",
    description: "Check first pixel on 32x32 blue image",
    type: "stdout",
    input: ["input/b_32x32.bmp"],
    options: ["-c", "tenth_pixel"],
    output: "[tT]enth_pixel\\s*:\\s*0\\s*,\\s*0,\\s*255"
  }

  , {
    feature: "tenth_pixel",
    name: "Tenth Pixel 11 12 13 : 1, 2, 3",
    description: "Check first pixel on 10x8 image",
    type: "stdout",
    input: ["input/tenth_pixel_11_12_13_10x8.bmp"],
    options: ["-c", "tenth_pixel"],
    output: "[tT]enth_pixel\\s*:\\s*11\\s*,\\s*12,\\s*13"
  }
];
