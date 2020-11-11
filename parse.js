const babelParser = require("@babel/parser");

function parse(input) {
  return babelParser.parse(input, {
    // Make the parsing very permissive
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    allowUndeclaredExports: true,

    // @TODO: add fallbacks to estraverse so that it can handle jsx nodes
    plugins: ["estree", "typescript", "jsx"],
    tokens: true,
  });
}

module.exports = parse;
