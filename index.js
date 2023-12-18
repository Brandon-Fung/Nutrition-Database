const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseURL = 'https://qgjqnhragerqetuxzuab.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnanFuaHJhZ2VycWV0dXh6dWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5Mzg5MzcsImV4cCI6MjAxODUxNDkzN30.ahDqdIJPXVpOsYC0CD4Yhpuqi-gQWEopfYiSIu8zXWw'
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/home.html', { root: __dirname})
})

app.get('/foodsearches', async (req, res) => {
    console.log('Getting Customer')

    const {data, error} = await supabase
    .from('FoodSearch')
    .select()
    if(error){
        console.log(error)
    } else if(data){
        res.send(data)
    }
})

app.post('/foodsearch', async (req, res) => {
    console.log('Adding Customer')
    var foodQuery = req.body.foodQuery;
    var minProtein = req.body.minProtein;
    var maxCalories = req.body.maxCalories;
    var maxCarbs = req.body.maxCarbs;

    const {data, error} = await supabase
    .from('FoodSearch')
    .insert([
        {'food': foodQuery, 'food_protein': minProtein, 'food_cal': maxCalories, 'food_carb': maxCarbs}
    ])
    .select();

    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})

app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE')
})