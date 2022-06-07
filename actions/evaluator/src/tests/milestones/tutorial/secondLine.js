export default [
  {
    feature: "second_line",
    name: "Second line First Pixel 64x64 Red : 255, 0, 0",
    description: "Check first pixel on the second line on 64x64 : should be red",
    type: "stdout",
    input: ["input/rgbw_64x64.bmp"],
    options: ["-c", "second_line"],
    output: "[sS]econd_line\\s*:\\s*255\\s*,\\s*0,\\s*0"
  },

  {
    feature: "second_line",
    name: "Second line First Pixel Red : 255, 0, 0",
    description: "Check first pixel on the second line on 32x32 red image",
    type: "stdout",
    input: ["input/r_32x32.bmp"],
    options: ["-c", "second_line"],
    output: "[sS]econd_line\\s*:\\s*255\\s*,\\s*0,\\s*0"
  },

  {
    feature: "second_line",
    name: "Second line First Pixel Green : 0, 255, 0",
    description: "Check first pixel on the second line on 32x32 green image",
    type: "stdout",
    input: ["input/g_32x32.bmp"],
    options: ["-c", "second_line"],
    output: "[sS]econd_line\\s*:\\s*0\\s*,\\s*255,\\s*0"
  },

  {
    feature: "second_line",
    name: "Second line First Pixel Blue : 0, 0, 255",
    description: "Check first pixel on the second line on 32x32 blue image",
    type: "stdout",
    input: ["input/b_32x32.bmp"],
    options: ["-c", "second_line"],
    output: "[sS]econd_line\\s*:\\s*0\\s*,\\s*0,\\s*255"
  }

  , {
    feature: "second_line",
    name: "Second line First Pixel 21 22 23",
    description: "Check first pixel on the second line on 8x8 image",
    type: "stdout",
    input: ["input/second_line_21_22_23_8x8.bmp"],
    options: ["-c", "second_line"],
    output: "[sS]econd_line\\s*:\\s*21\\s*,\\s*22,\\s*23"
  }
];
