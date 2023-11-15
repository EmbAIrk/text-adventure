// AdventurePage.js
import React, { useState, useEffect } from 'react';

const AdventurePage = ({ location }) => {
  const [output, setOutput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [inventory, setInventory] = useState([]);//to be used once we start parsing the response from GPT
  const [userNotes, setUserNotes] = useState('');

  //Read querystring parameters
  /*
  useEffect(() => {
    const queryParams = new URLSearchParams(location?.search);
    const gameplayType = queryParams.get('gameplayType') || '';
    const modifiers = queryParams.get('modifiers') || '';
    const savedGameKey = queryParams.get('savedGameKey') || '';

  }, [location]); Potentially not needed for the way that the modifiers are being passed*/ 

  const handleUserInput = () => {
    setOutput(`You entered: ${userInput}`);
    setUserInput('');
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <div style={{ height: '200px', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <p>{output}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your response..."
          />
          <button onClick={handleUserInput}>Submit</button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ height: '100px', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>User Inventory</h3>
          <ul>
           {/*Place holder for inventory list function*/}
          </ul>
        </div>
        <div style={{ height: '100px', border: '1px solid #ddd', padding: '10px' }}>
          <h3>User Notes</h3>
          <textarea
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Write your notes here..."
          />
        </div>
      </div>
    </div>
  );
};

export default AdventurePage;