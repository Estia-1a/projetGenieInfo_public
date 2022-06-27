import tests from "./tests.js";
import { testsObjectToArray } from "../utils.js";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import papa from "papaparse";

let str = papa.unparse(testsObjectToArray(tests), { header: true });

writeFile(resolve(process.argv[2], "tests.csv"), str, "utf8");
