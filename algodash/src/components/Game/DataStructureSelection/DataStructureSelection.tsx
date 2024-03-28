// DataStructureSelection.tsx
import React, { useState } from 'react';
import './DataStructureSelection.css';

interface DataStructureSelectionProps {
  dataStructures: string[];
  onSelect: (dataStructure: string) => void;
}

const DataStructureSelection: React.FC<DataStructureSelectionProps> = ({ dataStructures, onSelect }) => {
  const [selectedDataStructure, setSelectedDataStructure] = useState('');

  const handleDataStructureSelect = (dataStructure: string) => {
    setSelectedDataStructure(dataStructure);
    onSelect(dataStructure);
  };

  return (
    <div className="data-structure-selection">
      <h2>Select a Data Structure:</h2>
      <ul>
        {dataStructures.map((dataStructure, index) => (
          <li
            key={index}
            className={selectedDataStructure === dataStructure ? 'selected' : ''}
            onClick={() => handleDataStructureSelect(dataStructure)}
          >
            {dataStructure}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataStructureSelection;