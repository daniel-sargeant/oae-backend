const express = require("express");
const { pool } = require("./client");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT;

app.use(morgan("short"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  pool.query("SELECT * FROM posts;", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.get("/published", (req, res) => {
  pool.query(
    "SELECT * FROM posts WHERE published = true;",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

app.post("/", (req, res) => {
  if (req.body.content?.length) {
    const client = async () => await pool.connect();
    if (req.body.id) {
      client().then((x) => {
        const transactionText = `UPDATE posts SET (content, updated_at) = ($1, NOW()) WHERE id = $2 RETURNING *`;
        x.query(
          transactionText,
          [req.body.content, req.body.id],
          (error, results) => {
            if (error) {
              throw error;
            }
            res.status(200).json(results.rows[0]);
          }
        );
      });
    } else {
      client().then((x) => {
        const transactionText = `INSERT INTO posts(content, published, preoccupations, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`;
        x.query(
          transactionText,
          [req.body.content, req.body.published, req.body.preoccupations],
          (error, results) => {
            if (error) {
              throw error;
            }
            res.status(200).json(results.rows[0]);
          }
        );
      });
    }
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
