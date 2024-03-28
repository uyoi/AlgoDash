import React, { useState, useEffect } from 'react';
import './Game.css';

interface GameProps {
  code: string;
  onComplete: (speed: number) => void;
}

const Game: React.FC<GameProps> = ({ code, onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (userInput === code) {
      const typingSpeed = calculateTypingSpeed();
      onComplete(typingSpeed);
    }
  }, [userInput]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setUserInput(inputValue);

    if (startTime === 0) {
      setStartTime(Date.now());
    }

    if (inputValue === code) {
      setEndTime(Date.now());
    }
  };

  const calculateTypingSpeed = () => {
    const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
    const typingSpeed = code.length / elapsedTime; // Characters per second
    return Math.round(typingSpeed);
  };

  return (
    <div className="game-container">
      <pre className="code">{code}</pre>
      <textarea
        className="user-input"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type the code here..."
      ></textarea>
    </div>
  );
};

export default Game;