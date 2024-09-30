/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
// The path module in Node.js provides utilities for working with file and directory path.
const app = express();
const port = 3000;
const filesDirectory=path.join(__dirname,"files")   // code will work without using this too, just enter "files" in place of this variable
// filesDirectory: This variable holds the path to the files directory using path.join.
// path.join(), which is used to concatenate multiple path segments into a single, normalized path. It automatically handles the correct placement of path separators (/ or \ depending on the operating system) between segments and removes any unnecessary . or .. segments.

app.get("/files",function(req,res){
  fs.readdir(filesDirectory,function(err,files){
    if (err) {
      return res.status(500).json({ error: 'Unable to read files directory' });
    }
    res.status(200).json(files)
  })
})

app.get('/file/:filename', (req, res) => {
  const filePath = path.join(filesDirectory, req.params.filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).send('File not found');
      }
      return res.status(500).send('Error reading file');
    }
    res.status(200).send(data);
  });
});

app.use("*",function(req,res){
  res.status(404).send("Route not found")
})

app.listen(3000)
module.exports = app;