const http = require('http');
const fs = require('fs');
var crypto = require('crypto');

const server = http.createServer((req, res) => {
    if(req.method === "GET")
    {
        // Create a 1KB file with random text data
        const randomText = 'Random text data for your server file.';
        fs.writeFileSync('/app/serverdata/randomfile.txt', randomText);

        // Send the file and its checksum to the client
        const fileContent = fs.readFileSync('randomfile.txt', 'utf8');
        const checksum = generateChecksum(fileContent); // You can use a library to calculate the checksum

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({"fileContent": fileContent, "checksum": checksum}));
    }
    
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

function generateChecksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}