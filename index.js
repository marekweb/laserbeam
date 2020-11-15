const h = require("hastscript");
const convertBabelTokens = require("./convert-babel-tokens");
const highlightNodes = require("./highlight-nodes");
const transformTaggedComments = require("./transform-tagged-comments");
const parse = require("./parse");

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

  if (typeof options.mapTokens === "function") {
    tokens = tokens.map(options.mapTokens);
  }

  // highlightNodes modifies newTokens
  highlightNodes(tree.program, tokens);

  // Create new token types from comments that contain specific tags.
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

    let tokenBodyNode = t.text;
    if (t.link) {
      tokenBodyNode = h("a", { href: t.link }, tokenBodyNode);
    }

    return h(
      "span",
      { className: classList, "data-index": t.index, "data-type": t.type },
      tokenBodyNode
    );
  });
}

module.exports = {
  transform,
};
