const express = require('express')
const { pool } = require("./client");
const bodyParser = require('body-parser')
const cors = require ('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
    pool.query('SELECT * FROM posts;', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
