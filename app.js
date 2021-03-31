// Require Libraries
const express = require('express');

// App Setup
const app = express();
const Tenor = require("tenorjs").client({
    "Key": "RHH5CU206M9Z",
    "Filter" : "high",
    "Locale": "enUS"
});

// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    Tenor.Search.Query(term, "10")
        .then(response => {
            // Store gifs from query response
            const gifs = response;
            // Render home template with gifs
            // Will have assorted popular gifs if no query is given
            res.render('home', { gifs })
        }).catch(console.error);
});

app.get('/greetings/:name', (req, res) => {
    const name = req.params.name;
    res.render('greetings', { name });
})

// Start Server

app.listen(3000, () => {
    console.log('Gif Search Listening on port localhost:3000!');
});