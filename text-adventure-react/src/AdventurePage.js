// AdventurePage.js
import React, { useState, useEffect } from 'react';
import './App.css';

const AdventurePage = () => {
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
    setOutput((prevOutput) =>`${prevOutput}\nYou entered: ${userInput}`);
    setUserInput('');

  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8000/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          output: output,
          user_notes: userNotes,
          inventory: inventory,
        }),
      });
      // Handle the response as needed
    } catch (error) {
      console.error('Error saving data', error);
    }
  };
  

  const fetchResponse = async () => {
    try {
      const response = await fetch('http://localhost:8000/api.py/requestTest', 
      {method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    });

    if (!response.body) {
      throw new Error('Response is empty!');
    }
    const reader = response.body.getReader();
    let result = await reader.read();
    while (!result.done) {
      setOutput((prevOutput) => prevOutput + new TextDecoder().decode(result.value));
    result = await reader.read();
    }

  }
    catch (error)
    {
      console.error('There was an error processing the input', error);
    }
    setUserInput('');
    }

    useEffect(() => {
      fetchResponse();
    }, []);
    
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
      <h1 style={{ textAlign: 'center', marginTop: '0' }}>Your Adventure</h1>
        <div style={{ height: '200px', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <pre>{output}</pre>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your response..."
          />
          <button onClick={handleUserInput}>Submit</button>
          <button onClick={handleSave}>Save Game</button>

        </div>
      </div>
      <div style={{ flex: 1 }}>
      <h1 style={{ textAlign: 'center', marginTop: '0' }}>Trackers</h1>
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