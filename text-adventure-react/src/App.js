// App.js
import React, { useState } from 'react';
import StartupPage from './StartupPage';
import AdventurePage from './AdventurePage';
import './App.css';

const App = () => {
  const [showAdventurePage, setShowAdventurePage] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [savedGameKey, setSavedGameKey] = useState('');

  /**
   * Handles checking of initial response and starts the game by changing
   * the state of adventurePage to true for it to show.
   * 
   * @param {string} initialMessage GPT system prompt based on user selections
   */

  const handleStartGame = (initialMessage) => {
    if (!initialMessage)
    {
      alert("You must select a theme to continue!");
      return;
    }
    setInitialMessage(initialMessage);
    setShowAdventurePage(true);
  };

  /**
   * Handles checking of the saved game key and loads the game by changing
   * the state of adventurePage to true for it to show.
   * 
   * @param {string} savedGameKey unique user key from previous saved adventure
   */

  const handleLoadGame = (savedGameKey) => {
    if (!savedGameKey)
    {
      alert("You must enter a saved game key to continue!");
      return;
    }
    setSavedGameKey(savedGameKey);
    setShowAdventurePage(true);
  }

  return (
    <div>
      {showAdventurePage ? (
        <AdventurePage savedGameKey={savedGameKey} initialMessage={initialMessage} />
      ) : (
        <StartupPage onStartGame={handleStartGame} onLoadGame={handleLoadGame} />
      )}
    </div>
  );
};

export default App;
