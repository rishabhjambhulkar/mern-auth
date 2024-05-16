import React, { useState } from 'react';

const Guess = () => {
  const [guess, setGuess] = useState('');
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const handleGuess = () => {
    const userGuess = parseInt(guess);
    if (isNaN(userGuess)) {
      setMessage('Please enter a valid number.');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === randomNumber) {
      setMessage(`Congratulations! You guessed the number ${randomNumber} correctly in ${attempts} attempts.`);
    } else if (userGuess < randomNumber) {
      setMessage('Try a higher number.');
    } else {
      setMessage('Try a lower number.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Number Guessing Game</h1>
      <p className="mb-2">Guess a number between 1 and 100:</p>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded"
        value={guess}
        onChange={handleInputChange}
      />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2 hover:bg-blue-700"
        onClick={handleGuess}
      >
        Guess
      </button>
      {message && <p className="font-bold mt-4">{message}</p>}
    </div>
  );
};

export default Guess;
