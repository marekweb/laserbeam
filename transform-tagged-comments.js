function mapOnly(arr, filterCallback, mapCallback) {
  return arr.map((item, index) => {
    if (filterCallback(item, index, arr)) {
      return mapCallback(item, index, arr);
    }
    return item;
  });
}
function transformTaggedComments(tokens) {
  return mapOnly(
    tokens,
    t => t.type === "comment",
    t => {
      if (t.value.includes("@tag")) {
        const text = t.value.replace(/@tag/g, "").trim();
        return {
          type: "tag",
          text,
          value: text,
        };
      }

      if (t.value.includes("@badge")) {
        const text = t.value.replace(/@badge/g, "").trim();
        return {
          type: "badge",
          text,
          value: text,
        };
      }
      return t;
    }
  );
}

module.exports = transformTaggedComments;
