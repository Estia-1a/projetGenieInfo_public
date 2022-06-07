export default [
  {
    feature: "max_component R",
    name: "Max Component R of black 8x8",
    description: "Get the max component of a black image",
    type: "stdout",
    input: ["input/N_8x8.bmp"],
    options: ["-c", "max_component", "R"],
    output: "[mM]ax_component\\s*R\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*0\\s*,\\s*0,\\s*0"
  },
  {
    feature: "max_component R",
    name: "Max Component R of white 8x8",
    description: "Get the max component of a white image",
    type: "stdout",
    input: ["input/W_8x8.bmp"],
    options: ["-c", "max_component", "R"],
    output: "[mM]ax_component\\s*R\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*255\\s*,\\s*255,\\s*255"
  },
  {
    feature: "max_component R",
    name: "Max Component black ",
    description: "Get the max component at 2 0 ",
    type: "stdout",
    input: ["input/maxComponentR_2_0_255.bmp"],
    options: ["-c", "max_component", "R"],
    output: "[mM]ax_component\\s*R\\s*\\(\\s*2\\s*,\\s*0\\s*\\)\\s*:\\s*255"
  }


];
