// StartupPage.js
import React, { useState } from 'react';
import './App.css';

const StartupPage = ({ onStartGame }) => {
  const [gameplayType, setGameplayType] = useState('');
  const [modifiers, setModifiers] = useState('');
  const [savedGameKey, setSavedGameKey] = useState('');

  const handleEmbark = () => {
    // Placeholder for data validation


    // Otherwise just trigger the start of the game
    onStartGame({ gameplayType, modifiers, savedGameKey });
  };

  return (
    <div>
      <h1 className="title">EmbAIrk Text Adventure</h1>
      <div className="container">
      <div className="left-column title">
        <h2>New Game</h2>
      <label>
        Select Gameplay Type:
        </label>
        <select
          value={gameplayType}
          onChange={(e) => setGameplayType(e.target.value)}
        >
          <option value="">Gameplay Type</option>
          <option value="type1">Custom Game</option>
          <option value="type2">Pre-Determined Theme</option>
        </select>
      

      <br />

      <label>
        Modifiers:
        </label>
        <input
          type="text"
          value={modifiers}
          onChange={(e) => setModifiers(e.target.value)}
          placeholder="Add a theme, choose special characters, etc."
          
        />
        <br />
        <button onClick={handleEmbark}>Embark</button>
      
      </div>
      <br />
      <div className="right-column title" >
        <h2 className="title">Continue Previous Save</h2>
      <label>
        Enter Previous Saved Game Key:
        </label>
        <input
          type="text"
          value={savedGameKey}
          onChange={(e) => setSavedGameKey(e.target.value)}
        />
        <br/>
      <button onClick={handleEmbark}>Continue Adventure</button>

      <br />

      
      </div>
    </div>
    
    </div>
  );
};

export default StartupPage;