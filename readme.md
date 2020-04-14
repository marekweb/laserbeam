# Laserbeam

Laserbeam is a semantic syntax highlighter and annotator for JavaScript code.

Semanting highlighting allows you to apply different styles to tokens based on
their meaning in the syntax tree.

Annotation allows you to highlight or mark-up parts of the code, for
documentation or educational purposes.

Laserbeam goes beyond a tokenizer and uses a full JavaScript parser ([**babel
parser**][babel-parser]), which allows highlighting and annotation based on the
syntax tree.

## Project Goals

The goals for the Laserbeam project are to:

- perform semantic syntax highlighting (highlighting based on a token's role in
  the syntax tree)
- support annotations inside code blocks for the purpose of documentation
- integrate with code blocks inside of Markdown and HTML documents
- support EcmaScript features and common syntax extensions like JSX and
  TypeScript

## Output

Laserbeam outputs a representation of HTML nodes. This allows you to apply
transformations (add or remove nodes, change class names) before converting it
to HTML.

The output is in [**HAST**][hast] format and can be[converted to a HTML string
with a [HAST to HTML utility][hast-util-to-html].

## License

MIT © Marek Zaluski

[hast]: https://github.com/syntax-tree/hast
[hast-util-to-html]: https://github.com/syntax-tree/hast-util-to-html
[babel-parser]: https://github.com/babel/babel/tree/master/packages/babel-parser
