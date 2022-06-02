export default [
  {
    feature: "Dimension_2",
    name: "Dimension_2 64x64",
    description: "Test if the dimension feature is working",
    type: "stdout",
    input: ["input/rgbw_64x64.bmp"],
    options: ["-o", "dimension"],
    output: "[dD]imension[s]*\\s*:\\s*64\\s*,\\s*64"
  },

  {
    feature: "Dimension_2",
    name: "Dimension_2 1x1",
    description:
      "Test if the dimension feature is working for one by one files",
    type: "stdout",
    input: ["input/r_1x1.bmp"],
    options: ["-o", "dimension"],
    output: "[dD]imension[s]*\\s*:\\s*1\\s*,\\s*1"
  },

  {
    feature: "Dimension_2",
    name: "Dimension_2 32x64",
    description: "Test if the dimension feature is working",
    type: "stdout",
    input: ["input/rgbw_32x64.bmp"],
    options: ["-o", "dimension"],
    output: "[dD]imension[s]*\\s*:\\s*32\\s*,\\s*64"
  },

  {
    feature: "Dimension_2",
    name: "Dimension_2 64x32",
    description: "Test if the dimension feature is working",
    type: "stdout",
    input: ["input/rgbw_64x32.bmp"],
    options: ["-o", "dimension"],
    output: "[dD]imension[s]*\\s*:\\s*64\\s*,\\s*32"
  }
];
