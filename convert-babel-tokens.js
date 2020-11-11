const keywords = [
  "new",
  "function",
  "return",
  "let",
  "var",
  "const",
  "break",
  "if",
  "else",
  "throw",
  "catch",
  "async",
  "await",
  "yield",
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
  "${", // template expression, used along with `}`,
  ".",
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
  const type = getTokenType(babelToken);
  const text = source.slice(babelToken.start, babelToken.end);

  // Comments and strings have a "value" which is the content inside, without delimiters.
  // Meanwhile the "text" property is the entire text including delimiters.
  let value = text;
  if (type === "comment" || type === "string") {
    value = babelToken.value;
  }
  return {
    type,
    text,
    value,
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
  const convertedTokens = babelTokens.flatMap(t => {
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

  // It's expected that the last token is "eof", in which case drop it.
  if (convertedTokens[convertedTokens.length - 1].type === "eof") {
    convertedTokens.pop();
  }

  return convertedTokens;
}

module.exports = convertBabelTokens;
