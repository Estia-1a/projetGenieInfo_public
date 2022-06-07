export default [
  {
    feature: "max_pixel",
    name: "Max Pixel black 8x8",
    description: "Get the max pixel of a black image",
    type: "stdout",
    input: ["input/N_8x8.bmp"],
    options: ["-c", "max_pixel"],
    output: "[mM]ax_pixel\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*0\\s*,\\s*0,\\s*0"
  },
  {
    feature: "max_pixel",
    name: "Max Pixel white 8x8",
    description: "Get the max pixel of a white image",
    type: "stdout",
    input: ["input/W_8x8.bmp"],
    options: ["-c", "max_pixel"],
    output: "[mM]ax_pixel\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*255\\s*,\\s*255,\\s*255"
  },
  {
    feature: "max_pixel",
    name: "Max Pixel at 6 5 ",
    description: "Get the max pixel at 6 5 ",
    type: "stdout",
    input: ["input/maxPixel_6_5_60_50_100_8x8.bmp"],
    options: ["-c", "max_pixel"],
    output: "[mM]ax_pixel\\s*\\(\\s*6\\s*,\\s*5\\s*\\)\\s*:\\s*60\\s*,\\s*50,\\s*100"
  },
  {
    feature: "max_pixel",
    name: "Max Pixel at 3 4 ",
    description: "Get the max pixel at 3 4 ",
    type: "stdout",
    input: ["input/maxPixel_3_4_30_40_130_8x8.bmp"],
    options: ["-c", "max_pixel"],
    output: "[mM]ax_pixel\\s*\\(\\s*3\\s*,\\s*4\\s*\\)\\s*:\\s*30\\s*,\\s*40,\\s*130"
  }

];
