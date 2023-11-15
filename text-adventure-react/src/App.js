// App.js
import React, { useState } from 'react';
import StartupPage from './StartupPage';
import AdventurePage from './AdventurePage';
import './App.css';

const App = () => {
  const [showAdventurePage, setShowAdventurePage] = useState(false);
  const [gameOptions, setGameOptions] = useState(null);

  const handleStartGame = (options) => {
    setGameOptions(options);
    setShowAdventurePage(true);
  };

  return (
    <div>
      {showAdventurePage ? (
        <AdventurePage gameOptions={gameOptions} />
      ) : (
        <StartupPage onStartGame={handleStartGame} />
      )}
    </div>
  );
};

export default App;
