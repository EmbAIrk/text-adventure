// StartupPage.js
import React, { useState, useEffect } from "react";
import "./App.css";

const StartupPage = ({ onStartGame, onLoadGame }) => {
  const [gameplayTheme, setGameplayTheme] = useState("");
  const [modifiers, setModifiers] = useState("");
  const [savedGameKeyLocal, setSavedGameKeyLocal] = useState("");
  const [extraMods, setExtraMods] = useState(false);
  const [challenges, setChallenges] = useState("");
  const [location, setLocation] = useState("");
  const [gameplayLength, setGameplayLength] = useState("");
  const [endGoal, setEndGoal] = useState("");

  /**
   * Format initial message to GPT based on user selections.
   * Returns a function call to handleStartGame in App.js
   * with initial message as the argument
   */

  const handleEmbark = () => {
    let initialMessage = "";
    if (!gameplayTheme) {
      initialMessage = "";
    } else if (gameplayTheme && !extraMods) {
      initialMessage = `Start a ${gameplayTheme}-themed choose your own adventure.`;
    } else {
      initialMessage = `Start a ${gameplayTheme}-themed adventure. Be sure to include the following modifications:
      length of adventure: ${gameplayLength}; 
      location: ${location};
      challenges: ${challenges};
      end goal: ${endGoal};
      other modifiers: ${modifiers};
      `;
    }

    onStartGame(initialMessage);
  };

  /**
   * Returns a function call to handleLoadGame in App.js
   * with save key as the argument
   */

  const handleContinueGame = () => {
    onLoadGame(savedGameKeyLocal);
  };

  /**
   * Re-render component on change of state for gameplayTheme.
   * If gameplayTheme is custom, then extraMods = true.
   */

  useEffect(() => {
    if (gameplayTheme === "custom") {
      setExtraMods(true);
    } else {
      setExtraMods(false);
    }
  }, [gameplayTheme]);

  return (
    <div>
      <h1 className="title">EmbAIrk Text Adventure</h1>
      <div className="container">
        <div className="left-column title">
          <h2>New Game</h2>
          <label>To begin, first select a gameplay theme</label>
          <select
            value={gameplayTheme}
            onChange={(e) => setGameplayTheme(e.target.value)}
          >
            <option value="" disabled>
              Gameplay Theme
            </option>
            <option value="fantasy">Fantasy World</option>
            <option value="space">Space Exploration</option>
            <option value="post-apocalyptic">Post-Apocalyptic Future</option>
            <option value="historical">Historical Adventure</option>
            <option value="cyberpunk">Cyberpunk City</option>
            <option value="haunted-mansion">Haunted Mansion</option>
            <option value="pirate">Pirate's Life</option>
            <option value="dystopian-society">Dystopian Society</option>
            <option value="jurassic-adventure">Jurassic Adventure</option>
            <option value="spy-espionage">Spy Espionage</option>
            <option value="fairy-tale">Fairy Tale Quest</option>
            <option value="western">Wild West</option>
            <option value="superhero">Superhero Universe</option>
            <option value="underwater">Underwater Adventure</option>
            <option value="parallel-universe">Parallel Universes</option>
            <option value="sports">Sports Quest</option>
            <option value="custom">Custom</option>
          </select>

          <br />
          <input
            type="checkbox"
            checked={extraMods}
            onChange={(e) => setExtraMods(e.target.checked)}
          />
          <label>Click here to make additional gameplay modifications</label>
          <br />
          <>
            {extraMods && (
              <div className="extraMods">
                <label>
                  ① Game Length <br />
                </label>
                <select
                  value={gameplayLength}
                  onChange={(e) => setGameplayLength(e.target.value)}
                >
                  <option value="" disabled>
                    Gameplay Length
                  </option>
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>

                <br />

                <label>
                  ② Location <br />
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Specify a location for the adventure"
                />
                <br />
                <label>
                  ③ Challenges <br />
                </label>
                <input
                  type="text"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  placeholder="Specify challenges or obstacles you'd like to face in the adventure"
                />
                <br />
                <label>
                  ④ End Goal <br />
                </label>
                <input
                  type="text"
                  value={endGoal}
                  onChange={(e) => setEndGoal(e.target.value)}
                  placeholder="Specify the goal you'd like to achieve"
                />
                <br />
                <label>
                  ⑤ Other Modifiers <br />
                </label>
                <input
                  type="text"
                  value={modifiers}
                  onChange={(e) => setModifiers(e.target.value)}
                  placeholder="Add special characters or other custom modifications"
                />
                <br />
              </div>
            )}
          </>
          <button onClick={handleEmbark}>Embark</button>
        </div>
        <br />
        <div className="right-column title">
          <h2>Continue Previous Game</h2>
          <input
            type="text"
            value={savedGameKeyLocal}
            onChange={(e) => setSavedGameKeyLocal(e.target.value)}
            placeholder="16-Character Unique Adventure Code"
            style={{ textAlign: "center" }}
            maxLength="16"
          />
          <br />
          <button onClick={handleContinueGame}>Continue Adventure</button>

          <br />
        </div>
      </div>
      <p id="demo"></p>
    </div>
  );
};

export default StartupPage;
