'use strict'; 

const express = require('express'); 

const app = express(); 

app.get('/', (req, res) => {
    res.status(200).send('Hi there').end(); 
}); 

const PORT = process.env.PORT || 3000; 

app.listen(
    PORT, 
    () => {
        console.info('Nodejs-db is listening on port ${PORT}');
        console.info('Ctrl+c to exit');  
    }
); 

module.exports = app; 