const connection = require('./db')
const express = require('express')
const app = express()
const port = 3110
connection();

app.use(express.json())

//Available routes
app.use('/category', require('./routes/category.js'))


app.listen(port, () => {
  console.log(`Fleo Backend running at http://localhost:${port}`)
})

