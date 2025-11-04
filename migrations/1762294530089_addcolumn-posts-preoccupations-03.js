exports.up = (pgm) => {
  pgm.addColumns("posts", {
    preoccupations: { type: "text[]", notNull: false },
  });
};
