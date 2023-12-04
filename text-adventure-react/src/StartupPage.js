// StartupPage.js
import React, { useState } from 'react';
import './App.css';

const StartupPage = ({ onStartGame }) => {
  const [gameplayTheme, setGameplayTheme] = useState('');
  const [modifiers, setModifiers] = useState('');
  const [savedGameKey, setSavedGameKey] = useState('');

  const handleEmbark = () => {
    // Placeholder for data validation


    // Otherwise just trigger the start of the game
    onStartGame({ gameplayTheme, modifiers, savedGameKey }, "Space themed adventure");
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
          value={gameplayTheme}
          onChange={(e) => setGameplayTheme(e.target.value)}
        >
          <option value="" disabled>Gameplay Theme</option>
          <option value="space">Space</option>
          <option value="pirate">Pirate</option>
          <option value="western">Wild West</option>
          <option value="superhero">Super Hero</option>
          <option value="custom">Custom</option>
        </select>
      

      <br />

      <label>
        Modifiers:
        </label>
        <input
          type="text"
          value={modifiers}
          onChange={(e) => setModifiers(e.target.value)}
          placeholder="Add special characters or other custom modifications"
          
        />
        <br />
        <button onClick={handleEmbark}>Embark</button>
      
      </div>
      <br />
      <div className="right-column title" >
        <h2 className="title">Continue Previous Game</h2>
      <label>
        Enter Unique Saved Game Key:
        </label>
        <input
          type="text"
          value={savedGameKey}
          onChange={(e) => setSavedGameKey(e.target.value)}
          placeholder="xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx"
          style={{textAlign: 'center'}}
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