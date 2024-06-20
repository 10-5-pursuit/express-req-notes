const app = require('./app')

// Import our environment variables
require('dotenv').config()
// Grabs PORT from .env file
const PORT = process.env.PORT

// console.log(process.env)


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})