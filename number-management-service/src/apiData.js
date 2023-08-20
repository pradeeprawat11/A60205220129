const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

let numbers = [2, 3, 5, 7, 11, 13];

app.get('/numbers', (req, res) => {
  res.json(numbers);
});

app.post('/numbers', (req, res) => {
  const newNumber = req.body.number;
  numbers.push(newNumber);
  res.json(numbers);
});

app.listen(port, () => {
  console.log(`Number Management Microservice is running on port ${port}`);
});