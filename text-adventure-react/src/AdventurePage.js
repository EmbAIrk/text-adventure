import React, { useState, useEffect } from 'react';
import './App.css';

const AdventurePage = () => {
  const [output, setOutput] = useState('');
  const [lastResponse, setLastResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [inventory, setInventory] = useState([]);
  const [userNotes, setUserNotes] = useState('');

  const handleUserInput = () => {
    setOutput((prevOutput) => `${prevOutput}\nYou entered: ${userInput}`);
    setUserInput('');
    //sendUserInputToServer(userInput);
  };

  const fetchResponse = async () => {
    try {
      const response = await fetch('http://localhost:8000/requestTest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.body) {
        throw new Error('Response is empty!');
      }

      const reader = response.body.getReader();
      let result = await reader.read();
      let decodedResponse = '';
      while (!result.done) {
        decodedResponse += new TextDecoder().decode(result.value);
        result = await reader.read();
      }
      setLastResponse(decodedResponse);
    } catch (error) {
      console.error('There was an error processing the input', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchResponse();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1 style={{ textAlign: 'center', marginTop: '0' }}>Your Adventure</h1>
        <div style={{ height: '200px', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <pre>{output}</pre>
          <pre>{lastResponse}</pre>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your response..."
          />
          <button onClick={handleUserInput}>Submit</button>
          <button >Save Game</button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{ textAlign: 'center', marginTop: '0' }}>Trackers</h1>
        <div style={{ height: '100px', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>User Inventory</h3>
          <ul>
            {/* Placeholder for inventory list function */}
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
