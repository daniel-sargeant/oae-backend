exports.up = (pgm) => {
  pgm.createTable("posts", {
    id: "id",
    content: { type: "text", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: false,
    },
  });
};
