const express = require('express');
const bodyParser = require('body-parser');//middleware to parse form data sent in POST request
const app = express();
const port = 3008;

// Configure body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// A GET route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// A POST route to handle form submissions:
app.post('/submit', (req, res) => {
    const { fname, lname } = req.body;
    res.send(`Hello, ${fname}  ${lname}! Your form was submitted.`);
});

// Start the server on the selected port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
