const conectToMongo = require('./db')   
const express = require('express')

conectToMongo();

const app = express()
const port = 3001


// Available routes
app.use('/api/auth', require('./routes/auth'))  // works as a middleware
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})




