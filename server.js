const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4008;

// Configure body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// A GET route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// A POST route to handle form submissions
app.post('/submit', (req, res) => {
    const { fname, lname } = req.body;

    if (!fname || !lname) {
        // Respond with a "400 Bad Request" status if either first name or last name is missing
        res.status(400).send('ERROR 400 Bad Request: \n First name and last name are required');
    } else {
        // Respond with a "200 OK" status if both first name and last name are provided
        res.status(200).send(`Hello, ${fname} ${lname}! Your form was submitted.`);
    }
});

// Define a 404 route handler for non-existent routes like http://localhost:4008/nonexistent
app.use((req, res) => {
    res.status(404).send('ERROR 404 Not Found');
});

// Start the server on the selected port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
