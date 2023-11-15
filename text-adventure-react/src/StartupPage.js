// StartupPage.js
import React, { useState } from 'react';

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
      <h1>EmbAIrk Text Adventure</h1>
      <label>
        Select Gameplay Type:
        <select
          value={gameplayType}
          onChange={(e) => setGameplayType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="type1">Gameplay Type 1</option>
          <option value="type2">Gameplay Type 2</option>
        </select>
      </label>

      <br />

      <label>
        Modifiers:
        <input
          type="text"
          value={modifiers}
          onChange={(e) => setModifiers(e.target.value)}
        />
      </label>

      <br />

      <label>
        Enter Previous Saved Game Key:
        <input
          type="text"
          value={savedGameKey}
          onChange={(e) => setSavedGameKey(e.target.value)}
        />
      </label>

      <br />

      <button onClick={handleEmbark}>Embark</button>
    </div>
  );
};

export default StartupPage;