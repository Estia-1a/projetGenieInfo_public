export default [
  {
    feature: "min_component R",
    name: "Min Component R of black 8x8",
    description: "Get the min component of a black image",
    type: "stdout",
    input: ["input/N_8x8.bmp"],
    options: ["-c", "min_component", "R"],
    output: "[mM]in_component\\s*R\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*0\\s*,\\s*0,\\s*0"
  },
  {
    feature: "min_component R",
    name: "Min Component R of white 8x8",
    description: "Get the min component of a white image",
    type: "stdout",
    input: ["input/W_8x8.bmp"],
    options: ["-c", "min_component", "R"],
    output: "[mM]in_component\\s*R\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*255\\s*,\\s*255,\\s*255"
  },
  {
    feature: "min_component R",
    name: "Min Component black ",
    description: "Get the min component at 2 0 ",
    type: "stdout",
    input: ["input/minComponentR_2_0_5.bmp"],
    options: ["-c", "min_component", "R"],
    output: "[mM]in_component\\s*R\\s*\\(\\s*2\\s*,\\s*0\\s*\\)\\s*:\\s*5"
  }


];
