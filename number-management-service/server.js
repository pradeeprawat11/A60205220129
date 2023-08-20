const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const postData = {
  numbers: [2, 3, 5, 7, 11, 13]
};

app.get('/numbers', (req, res) => {
    const newNumberData = req.body.number;

  res.json(postData.numbers);
});

app.post('/numbers/primes', (req, res) => {
  const newNumber = req.body.numbers;

  // Check if the number is prime
  const isPrime = isNumberPrime(newNumber);
  if (!isPrime) {
    return res.status(400).json({ error: 'Number is not prime' });
  }

  postData.numbers.push(newNumber);
  res.json(postData.numbers);
});

function isNumberPrime(number) {
  if (number <= 1) return false;
  if (number <= 3) return true;

  if (number % 2 === 0 || number % 3 === 0) return false;

  let i = 5;
  while (i * i <= number) {
    if (number % i === 0 || number % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}

app.listen(port, () => {
  console.log(`Number Management Microservice is running on port ${port}`);
});
