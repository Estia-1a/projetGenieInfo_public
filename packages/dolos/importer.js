import papa from "papaparse";
import { readFile, mkdir, copyFile } from "fs/promises";

import { DSU } from "./DSU.js";
let csv = await readFile(process.argv[2], "utf8");
let { data } = papa.parse(csv, { skipEmptyLines: true, header: true });

const cluster = new DSU();

const students = {};
const cleanPath = (path) => path?.replace("result/", "").replace(".js", "");

data.map((e) => {
  const l = (students[cleanPath(e.leftFilePath)] = students[
    cleanPath(e.leftFilePath)
  ] ?? { triche: false, cluster: null, link: 0, similarity: 0, all: {} });
  const r = (students[cleanPath(e.rightFilePath)] = students[
    cleanPath(e.rightFilePath)
  ] ?? { triche: false, cluster: null, link: 0, similarity: 0, all: {} });
  if (e.similarity > 0.35) {
    cluster.union(cleanPath(e.leftFilePath), cleanPath(e.rightFilePath));
    l.triche = true;
    l.link++;
    l.all[cleanPath(e.rightFilePath)] = e.similarity;
    if (e.similarity > l.similarity) {
      l.similarity = Math.max(l.similarity, e.similarity);
      l.bestMatch = cleanPath(e.rightFilePath);
    }
    if (e.similarity > r.similarity) {
      r.similarity = Math.max(r.similarity, e.similarity);
      r.bestMatch = cleanPath(e.leftFilePath);
    }
    r.triche = true;
    r.link++;
    r.all[cleanPath(e.leftFilePath)] = e.similarity;
  }
});

Object.entries(students).map(async ([path, info]) => {
  if (info.triche) {
    console.log(path, ",", info.bestMatch, ",", info.similarity);
    let dest = "similarity/" + path;
    await mkdir(dest, { recursive: true });
    copyFile("result/" + path + ".js", dest + "/" + "__" + path + ".js");
    Object.entries(info.all).map(([path, sim]) =>
      copyFile(
        "result/" + path + ".js",
        dest + "/" + "_" + Math.floor((1 - sim) * 10) + path + ".js"
      )
    );
  } else {
    let dest = "similarity/" + 0 + "/";
    await mkdir(dest, { recursive: true });
    copyFile("result/" + path + ".js", dest + "/" + path + ".js");
  }
});
