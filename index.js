const babelParser = require("@babel/parser");
const convertBabelTokens = require("./convert-babel-tokens");
const highlightNodes = require("./highlight-nodes");
const transformTaggedComments = require("./transform-tagged-comments");
const h = require("hastscript");

function parse(input) {
  return babelParser.parse(input, {
    // Make the parsing very permissive
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    allowUndeclaredExports: true,

    plugins: ["estree"],
    tokens: true,
  });
}

const defaultOptions = {
  removeComments: false,
};

function transform(source, options = {}) {
  options = { ...defaultOptions, ...options };

  const tree = parse(source);
  let tokens = convertBabelTokens(tree.tokens, source);

  if (options.removeComments) {
    tokens = removeCommentTokens(tokens);
  }

  // highlightNodes modifies newTokens
  highlightNodes(tree.program, tokens);

  // Transform special comments
  tokens = transformTaggedComments(tokens);

  // Apply removal to tokens which are flagged `remove`.
  tokens = tokens.filter(t => !t.remove);

  const hastNodes = convertTokensToHastNodes(tokens);
  return hastNodes;
}

function removeCommentTokens(tokens) {
  tokens.forEach(t => {
    if (t.type === "comment") {
      t.remove = true;
    }
  });
}

function convertTokensToHastNodes(tokens) {
  return tokens.map(t => {
    if (t.type === "icon") {
      return h("img.t-icon", {
        title: t.text,
        src: t.icon ? `/${t.icon}.svg` : "/alert-triangle.svg",
      });
    }

    const classList = ["t-token"];
    if (t.type) {
      classList.push(`t-${t.type}`);
    }

    if (t.highlight) {
      classList.push("t-highlight");
    }

    return h(
      "span",
      { className: classList, "data-index": t.index, "data-type": t.type },
      t.text
    );
  });
}

module.exports = {
  transform,
};
