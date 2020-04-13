const keywords = [
  "new",
  "function",
  "return",
  "let",
  "var",
  "const",
  "break",
  "if",
];
const punctuation = [
  "+/-",
  ",",
  ";",
  ":",
  "=",
  "(",
  ")",
  "`",
  "{",
  "}", // also used as the end of template expression
  "[",
  "]",
  "/",
  "**",
  "</>/<=/>=",
  /* all assigning operators: */ "_=",
  "==/!=/===/!==",
  "!",
  "++/--",
  "&&",
  "||",
  "=>",
  "${", // template expression, used along with `}`
];

function getTokenType(babelToken) {
  if (babelToken.type === "CommentLine" || babelToken.type === "CommentBlock") {
    return "comment";
  }
  const label = babelToken.type.label;
  if (punctuation.includes(label)) {
    return "punctuation";
  }

  if (keywords.includes(label)) {
    return "keyword";
  }

  return babelToken.type.label || babelToken.type;
}

function convertBabelToken(babelToken, source) {
  return {
    type: getTokenType(babelToken),
    text: source.slice(babelToken.start, babelToken.end),
    start: babelToken.start,
    end: babelToken.end,
  };
}

function convertBabelTokens(babelTokens, source) {
  if (!Array.isArray(babelTokens)) {
    throw new Error(
      "convertBabelTokens: first argument should be an array of tokens"
    );
  }

  if (typeof source !== "string") {
    throw new Error(
      "convertBabelTokens: second argument should be a string containing source code"
    );
  }

  let position = 0;
  return babelTokens.flatMap(t => {
    const resultTokens = [];
    if (t.start > position) {
      // Need to insert a whitespace token
      resultTokens.push({
        type: "whitespace",
        text: source.slice(position, t.start),
        start: position,
        end: t.start,
      });
    }
    resultTokens.push(convertBabelToken(t, source));
    position = t.end;
    return resultTokens;
  });
}

module.exports = convertBabelTokens;
