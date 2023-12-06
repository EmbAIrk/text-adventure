// App.js
import React, { useState } from 'react';
import StartupPage from './StartupPage';
import AdventurePage from './AdventurePage';
import './App.css';

const App = () => {
  const [showAdventurePage, setShowAdventurePage] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [savedGameKey, setSavedGameKey] = useState('');

  const handleStartGame = (initialMessage) => {
    setInitialMessage(initialMessage);
    setShowAdventurePage(true);
  };

  const handleLoadGame = (savedGameKey) => {
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
