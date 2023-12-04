// App.js
import React, { useState } from 'react';
import StartupPage from './StartupPage';
import AdventurePage from './AdventurePage';
import './App.css';

const App = () => {
  const [showAdventurePage, setShowAdventurePage] = useState(false);
  const [initialResponse, setInitialResponse] = useState('');
  const [gameOptions, setGameOptions] = useState(null);

  const handleStartGame = (options, initialResponse) => {
    setGameOptions(options);
    setInitialResponse(initialResponse);
    setShowAdventurePage(true);
  };

  return (
    <div>
      {showAdventurePage ? (
        <AdventurePage gameOptions={gameOptions} initialResponse={initialResponse} />
      ) : (
        <StartupPage onStartGame={handleStartGame} />
      )}
    </div>
  );
};

export default App;
