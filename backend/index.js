const conectToMongo = require('./db')   
const express = require('express')
const cors = require("cors");

conectToMongo();

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())   // we need a middleware to use req.body

// Available routes
app.use('/api/auth', require('./routes/auth'))  // works as a middleware
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`myNoteBook backend listening on port ${port}`)
})




