const estraverse = require("estraverse");

function highlightNodes(tree, tokens) {
  estraverse.traverse(tree, {
    enter(node) {
      const commentFlagNode = getNodeCommentFlagNode(node);
      if (commentFlagNode) {
        applyToNodeTokens(node, tokens, t => (t.highlight = true));
        applyToNodeTokens(commentFlagNode, tokens, t => (t.remove = true));
      }
    },
  });
}

function applyToNodeTokens(node, tokens, callback) {
  const nodeTokens = tokens.filter(
    t => t.start >= node.start && t.end <= node.end
  );
  nodeTokens.forEach(callback);
}

function getNodeCommentFlagNode(node) {
  if (!node.leadingComments) {
    return null;
  }

  for (let commentNode of node.leadingComments) {
    if (commentNode.value.includes("@highlight")) {
      return commentNode;
    }
  }

  return null;
}

module.exports = highlightNodes;
