# Laserbeam

Laserbeam is an semantic syntax highlighter and annotator for JavaScript code.

By using a full JavaScript parser ([**babel parser**][babel-parser]), Laserbeam
is capable of highlighting and annotating based on the syntax tree.

## Project Goals

The goals for the Laserbeam project are to:

- perform semantic syntax highlighting
- support annotations inside code blocks for the purpose of documentation
- integrate with Markdown and HTML document processors
- support EcmaScript features and common syntax extensions like JSX and
  TypeScript

## Output

Laserbeam outputs a representation of HTML nodes.

The output is in [**HAST**][hast] format and can be [converted to a HTML
string][hast-util-to-html].

## License

MIT © Marek Zaluski

[hast]: https://github.com/syntax-tree/hast
[hast-util-to-html]: https://github.com/syntax-tree/hast-util-to-html
[babel-parser]: https://github.com/babel/babel/tree/master/packages/babel-parser
