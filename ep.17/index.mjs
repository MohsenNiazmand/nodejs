import express from 'express';


// const express = require('express')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/bye', (req, res) => {
    res.send('bye World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});