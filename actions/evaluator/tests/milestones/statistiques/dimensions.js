module.exports = {} ;
module.exports.test1 = {
  feature : "Dimension",
  name : "Dimension 64x64",
  description: "Test if the dimension feature is working",
  type: "stdout",
  input: ["input/a_64x64.bmp"],
  options: ["-o", "dimension"],
  output : "[dD]imension[s]*\\s*:\\s*64\\s*,\\s*64"
}

module.exports.test2 = {
  feature : "Dimension",
  name : "Dimension 1x1",
  description: "Test if the dimension feature is working for one by one files",
  type: "stdout",
  input: ["input/a_1x1.bmp"],
  options: ["-o", "dimension"],
  output : "[dD]imension[s]*\\s*:\\s*1\\s*,\\s*1"
}
