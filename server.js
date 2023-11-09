const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // get the HTML form
        fs.readFile(__dirname + '/index.html', (error, data) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });//error occurred while reading the file status is 500
                res.end('Internal Server Error');//http://localhost:3000/text/plain
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });//there is no error status is 200
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/submit') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const fname = formData.get('fname');
            const lname = formData.get('lname');

            if (!fname || !lname) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end(`Error 400 Bad Request:\n First name and last name must be non-empty strings`);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`Hello, ${fname} ${lname}! Your form was submitted.`);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Error 404 Not Found');//error occurred
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});