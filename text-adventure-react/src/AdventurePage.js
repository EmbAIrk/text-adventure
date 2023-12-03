import React, { useState, useEffect } from 'react';
import './App.css';

const AdventurePage = () => {
  //const [output, setOutput] = useState('');
  const [lastResponse, setLastResponse] = useState('');
  const [userInput, setUserInput] = useState('');
  const [inventory, setInventory] = useState([]);
  const [userNote, setUserNote] = useState('');
  const [userNoteList, setUserNoteList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [formatConversation, setFormatConversation] = useState([]);
  const [isGameSaved, setIsGameSaved] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleUserInput = () => {
    if (userInput === '')
    {
      alert("Error: You must enter a response first!");
      return;
    }
    setFormatConversation((prevConversation) => [
      ...prevConversation,
      {role: 'user', content: userInput}
    ]);
    //setOutput((prevOutput) => `${prevOutput}\nYou entered: ${userInput}\n${lastResponse}`);
    fetchResponse();
    console.log(formatConversation);
    setUserInput('');
    //sendUserInputToServer(userInput);
  };

  const fetchResponse = async () => {
    setIsPending(true);
    try {
      const role='user'
      const response = await fetch('http://localhost:8000/request', {
        method: 'POST',
        /*headers: {
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer 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',
        },*/
        body: JSON.stringify([{
          role: role,
          content: userInput
        }]),
      });
      
      if (!response.body) {
        throw new Error('Response is empty!');
      }
      
      const reader = response.body.getReader();
      let result = await reader.read();
      console.log(result);
      let decodedResponse = '';
      while (!result.done) {
        decodedResponse += new TextDecoder().decode(result.value);
        result = await reader.read();
      }
      setLastResponse(decodedResponse);
      setFormatConversation((prevConversation) => [
        ...prevConversation,
        {role: 'GPT', content: decodedResponse },
      ]);
      setIsPending(false);
    } catch (error) {
      console.error('There was an error processing the input', error);
    }
  };


  const saveGame = () => {
    setIsGameSaved(true);
  }

const updateUserNoteList = () => {
  setUserNoteList((prevUserNoteList) => [
    ...prevUserNoteList,
    userNote,
    
  ]);
  setUserNote('')
  };

  const deleteNote = (index) => {
    setUserNoteList((prevUserNoteList) => {
      const updatedList = [...prevUserNoteList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  const parseInventory = () => {

  };

  return (
    <div style={{ display: 'flex', margin: '20px', justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, marginRight: '20px', height: '100vh' }}>
        <h1 style={{ textAlign: 'center', marginTop: '0' }}>Your Adventure</h1>
        <div style={{ height: '75%', border: '1px solid #ddd', padding: '10px', marginBottom: '10px', overflowY: 'auto'}}>
        {formatConversation.map((item, index) => (
          <div key={index} style={{ textAlign: item.role === 'user' ? 'right' : 'left', marginBottom: '8px' }}>
            {item.role === 'user' ? (<div> <strong>You: </strong> {item.content} </div>): (<div><strong>Chat GPT: </strong> <div dangerouslySetInnerHTML={{ __html: item.content }}/></div>)}
          </div>
        ))}
        {isPending && (
          <p>Generating your response...</p>
        )}
      </div>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Write your response here..."
            maxLength={150}
            style={{
              width: '97%',
              padding: '10px',
              fontSize: '20px'
              
          }}
          />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
          <button style={{ flex: 1 }} onClick={handleUserInput}>Enter ⬆️</button>
          <button style={{ flex: 1 }}>Undo Last Action ↩️</button>
          <button style={{ flex: 1 }} onClick={saveGame}>Save Game &#x1F4BE;</button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{ textAlign: 'center', marginTop: '0' }}>Player Resources</h1>
        <div style={{ height: '250px', border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
        <h3 style={{margin: '0', textAlign: "center"}}>Inventory</h3>
          <ul>
            {/* Placeholder for inventory list function */}
          </ul>
        </div>
          
          <div style={{ height: '250px', border: '1px solid #ddd', padding: '10px', marginBottom: '10px', marginTop: '20px', overflowY: 'auto'}}>
          <h3 style={{margin: '0', textAlign: "center"}}>Notepad</h3>
            {userNoteList.map((item, index) => (
            <p key={index} style={{fontSize: '20px'}}>
              <span
              style={{ marginRight: '10px', cursor: 'pointer' }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {hoverIndex === index ? (
                <span onClick={() => deleteNote(index)}>Delete {item}</span>
              ) : (
                <span>✎ {item}</span>
              )}
            </span>
              </p>
            ))}
          </div>
          <input type="text"
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="Write your notes here..."
          />
          <button onClick={(e) => userNote === '' ? alert("Error: no note!") : updateUserNoteList()}>Add Note ➕</button>
          {isGameSaved && (
          <div style={{ height: 'auto', border: '1px solid #ddd', padding: '10px', marginBottom: '10px', marginTop: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ margin: '0', textAlign: 'center' }}>Save Key</h3>
            <p id="saveKey" style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}>516s25-ea680036-th3959078</p>
          </div>)}
        </div>
        
      </div>
  );
};

export default AdventurePage;
