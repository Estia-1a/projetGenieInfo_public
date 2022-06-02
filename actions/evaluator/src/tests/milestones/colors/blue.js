export default [
  {
    feature: "blue",
    name: "Blue Identity",
    description: "Test if working on an already blue image",
    type: "image",
    input: ["input/b_32x32.bmp"],
    options: ["-c", "blue"],
    expectedOutput: ["image_out.bmp"],
    reference: ["input/b_32x32.bmp"]
  }
];
