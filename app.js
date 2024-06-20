const express = require('express')
const colors = require('./models/colors')

const app = express()


// Route for Home page
app.get('/', (req, res) => {
    res.send('Welcome to my App.')
})

app.get('/colors', (req, res) => {
    res.send(colors)
})


// random colors -- does the order of our routes matter?!
// Yes, order matters. Since the path starts with '/colors/' it has to come before '/colors/:index' bc the :index denotes a dynamic parameter that is subject to change.
app.get('/colors/random', (req, res) => {
    const randomNum = Math.floor(Math.random() * colors.length)
    res.send(colors[randomNum])
})


// req.params is an object that holds ALL of the dynamic pieces of our route: (parameters)
// Inside the object, the parameters are the keys, where the values are what we pass into the URL, example: localhost:4001/colors/1 <-- "1" is the parameter
app.get('/colors/:index', (req, res) => {
    const { index } = req.params
    if(colors[index]){
        res.send( colors[index] )
    } else {
        res.send(`Cannot find any colors at this index: ${index}`)
    }
})


app.get('/hello/:user/:food', (req, res) => {
    const { user, food } = req.params
    res.send(`My name is ${user}, my fav food is ${food}`)
})


// Looking ahead to using a database
app.get('/pokemon/:id', async (req, res) => {
    // Use the ID to search the database for a single pokemon that has that ID, get their info and send it back to the client
    const { id } = req.params

    // getSinglePokemon comes from another file that holds our functions that interact w the database
    const singlePokemon = await getSinglePokemon(id)
    res.json(singlePokemon)
})



// Query Strings
// Endpoint: /calculator/add?num1=5&num2=2
app.get('/calculator/:operator', (req, res) => {
    // Both req.params and req.query are objects
    // console.log(req.params)
    // console.log(req.query)
    const { num1, num2 } = req.query
    const { operator } = req.params
    if(operator === "add"){
        const sum = Number(num1) + Number(num2)
        res.send(`Sum is ${sum}`)
    } else if(operator === "sub"){
        const difference = Number(num1) - Number(num2)
        res.send(`Difference is ${difference}`)
    } else {
        res.send('Calculator does not recognize that function')
    }
})

app.get('/countdown/:num', (req, res) => {
    const { num } = req.params
    if(Number(num) === 0){
        res.send('Happy New Year!')
    } else {
        res.send(`<h1>The count down number is ${num}</h1><a href="/countdown/${num - 1}">Go down one</a>`)
    }
})

module.exports = app