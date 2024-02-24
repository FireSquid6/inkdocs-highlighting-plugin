import type { Plugin } from "inkdocs";
import parse from "node-html-parser";
import hljs from "highlight.js";

// You have to provide your own css file to properly take advantage of this.
export default function SyntaxHighlighter(): Plugin {
  return {
    afterBuild: (_, pages) => {
      for (const page of pages) {
        page.page = highlightPage(page.page);
      }
    },
  };
}

export function highlightPage(source: string): string {
  const dom = parse(source);

  dom.getElementsByTagName("pre").forEach((pre) => {
    // console.log(pre.toString());

    // find the language
    let language = "plaintext";
    RegExp(/language-(\w+)/)
      .exec(pre.toString())
      ?.forEach((match) => {
        language = match;
      });
    const highlighted = hljs.highlight(pre.toString(), {
      language: language,
    }).value;
    pre.set_content(highlighted);
  });
  // prisma js plugin. Automatically adds the prisma clases to the project. This is done at build time

  return dom.toString();
}
