import React, { useState } from 'react';
import './App.css';

function App() {
  const [newNumber, setNewNumber] = useState('');
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const handleAddNumber = async () => {
    if (!newNumber || isNaN(newNumber) || newNumber <= 0) {
      setResponseMessage('Please enter a valid positive number.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/numbers/primes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: parseInt(newNumber) })
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Prime number ${newNumber} added successfully.`);
        setNewNumber(''); // Clear the input after successful addition
        setPrimeNumbers(data);
      } else {
        setResponseMessage('Error occurred while adding the prime number.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred while adding the prime number.');
    }
  };

  return (
    <div className="App">
      <h1>Prime Number Management</h1>
      <div>
        <label htmlFor="newNumber">New Prime Number:</label>
        <input
          type="number"
          id="newNumber"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <button onClick={handleAddNumber}>Add Prime Number</button>
      </div>
      <p>{responseMessage}</p>
      <h2>Prime Numbers:</h2>
      <ul>
        {primeNumbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;