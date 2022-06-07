export default [
  {
    feature: "max_component G",
    name: "Max Component G of black 8x8",
    description: "Get the max component of a black image",
    type: "stdout",
    input: ["input/N_8x8.bmp"],
    options: ["-c", "max_component", "G"],
    output: "[mM]ax_component\\s*G\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*0\\s*,\\s*0,\\s*0"
  },
  {
    feature: "max_component G",
    name: "Max Component G of white 8x8",
    description: "Get the max component of a white image",
    type: "stdout",
    input: ["input/W_8x8.bmp"],
    options: ["-c", "max_component", "G"],
    output: "[mM]ax_component\\s*G\\s*\\(\\s*0\\s*,\\s*0\\s*\\)\\s*:\\s*255\\s*,\\s*255,\\s*255"
  },
  {
    feature: "max_component G",
    name: "Max Component black ",
    description: "Get the max component at 2 0 ",
    type: "stdout",
    input: ["input/maxComponentG_2_0_255.bmp"],
    options: ["-c", "max_component", "G"],
    output: "[mM]ax_component\\s*G\\s*\\(\\s*2\\s*,\\s*0\\s*\\)\\s*:\\s*255"
  }


];
