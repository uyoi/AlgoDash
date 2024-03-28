import React, { useState } from 'react';
import './AlgorithmSelection.css';

interface AlgorithmSelectionProps {
  algorithms: string[];
  onSelect: (algorithm: string) => void;
}

const AlgorithmSelection: React.FC<AlgorithmSelectionProps> = ({ algorithms, onSelect }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  const handleAlgorithmSelect = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
    onSelect(algorithm);
  };

  return (
    <div className="algorithm-selection">
      <h2>Select an Algorithm:</h2>
      <ul>
        {algorithms.map((algorithm, index) => (
          <li
            key={index}
            className={selectedAlgorithm === algorithm ? 'selected' : ''}
            onClick={() => handleAlgorithmSelect(algorithm)}
          >
            {algorithm}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlgorithmSelection;