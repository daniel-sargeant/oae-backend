exports.up = (pgm) => {
  pgm.addColumns("posts", {
    published: { type: "boolean", notNull: true, default: false },
  });
};
