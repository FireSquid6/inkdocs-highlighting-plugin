import { highlightPage } from ".";
import fs from "fs";

const text = fs.readFileSync("test.html", "utf-8");

const output = highlightPage(text);

fs.writeFileSync("output.html", output);
