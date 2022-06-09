import { readFile, writeFile } from "fs/promises";
import { dirname, resolve } from "path";
import papa from "papaparse";

const testCSV = await readFile(process.argv[2], "utf8");

let { data: tests } = papa.parse(testCSV, {
  header: true,
});
const convertToArray = (test) => {
  test.input = test.input.split(" ");
  test.output = test.output.split(" ");
  test.options = test.options.split(" ");
  if (test.coordinates) test.coordinates = test.coordinates.split(" ");
  return test;
};

const consolidateOptions = (test) => {
  test.options = ["-c", ...test.feature.split(" "), ...test.options].filter(
    (e) => e
  );
  return test;
};

const consolidateInputOutput = (test) => {
  //Skip image for now.
  test.input = test.input.map((filename) => "input/" + filename);
  if (test.type == "stdout") {
    test.output = convert(test.feature, test.output, test.coordinates);
  } else if (test.type == "image") {
    test.output = test.output.map((filename) => "input/" + filename);
  }

  return test;
};

const convert = (feature, values, coordinate = null) => {
  feature = feature.split("_");
  feature = feature
    .map(
      (word) =>
        `[${word[0].toLowerCase()}${word[0].toUpperCase()}]` + word.slice(1)
    )
    .join("_");
  if (coordinate) feature += ` \\( ${coordinate.join(", ")} \\)`;
  feature += " : ";
  if (values) feature += [].concat(values).join(", ");
  feature = `^ ${feature} $`;
  feature = feature.replaceAll(" ", "\\s*");
  return feature;
};

tests = tests
  .map(convertToArray)
  .map(consolidateOptions)
  .map(consolidateInputOutput)
  .reduce(
    (o, t) => {
      if (!o.milestones[t.milestone]) o.milestones[t.milestone] = [];
      o.milestones[t.milestone].push(t);
      return o;
    },
    { milestones: {} }
  );

await writeFile(
  resolve(dirname(process.argv[2]), "tests.js"),
  "export default " + JSON.stringify(tests),
  "utf8"
);
