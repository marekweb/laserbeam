const convertBabelTokens = require("./convert-babel-tokens");
const parse = require("./parse");

const source = `const a = [f("b" + 1)].x[1];`;

it("produces an array of converted tokens", () => {
  const input = parse(source);
  const convertedTokens = convertBabelTokens(input.tokens, source);
  expect(convertedTokens).toMatchSnapshot();
});
