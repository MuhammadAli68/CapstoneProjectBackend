const http = require('http');
const fs = require('fs');
var crypto = require('crypto');
const express = require('express');
var cors = require('cors')

app = express();

app.use(cors()) // Use this after the variable declaration

app.get('/file',(req, res) => {
    // Create a 1KB file with random text data
    const randomText = 'Random text data for your server file.';
    fs.writeFileSync('/app/serverdata/randomfile.txt', randomText); //

    // Send the file and its checksum to the client
    const fileContent = fs.readFileSync('/app/serverdata/randomfile.txt', 'utf8');
    const checksum = generateChecksum(fileContent); // You can use a library to calculate the checksum

    // res.writeHead(200, { 'Content-Type': 'application/json' });
    res.json({"fileContent": fileContent, "checksum": checksum}); //JSON.stringify({"fileContent": fileContent, "checksum": checksum})
    
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

function generateChecksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}