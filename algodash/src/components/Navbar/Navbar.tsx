import React from 'react';
import './Navbar.css';

interface NavbarProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ selectedLanguage, onLanguageChange }) => {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div className="navbarContainer">
      <div className="logo">
        <img src="/AlgoDash.jpeg" alt="AlgoDash Logo" />
      </div>
      <div className="title">
        <h1>AlgoDash</h1>
      </div>
      <div className="languageDropdown">
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;