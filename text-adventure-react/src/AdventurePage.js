import React, { useState, useEffect } from "react";
import "./App.css";
import "./App.js";
import "./StartupPage.js";

const AdventurePage = ({ savedGameKey, initialMessage }) => {
  const [lastResponse, setLastResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [inventory, setInventory] = useState([]);
  const [userNote, setUserNote] = useState("");
  const [userNoteList, setUserNoteList] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [formatConversation, setFormatConversation] = useState([]);
  const [tempConversation, setTempConversation] = useState([]);
  const [isGameSaved, setIsGameSaved] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [userKey, setUserKey] = useState("");

  /**
   * Validate user input. If input is empty string, display error box, otherwise
   * add to conversation log as a 'user' message.
   */

  const handleUserInput = () => {
    if (userInput === "") {
      alert("Error: You must enter a response first!");
      return;
    }
    setFormatConversation((prevConversation) => [
      ...prevConversation,
      { role: "user", content: userInput },
    ]);

    setUserInput("");
  };

  /**
   * HTTP 'POST' request to /request endpoint and call to writeToTextBox()
   * for handling the streamed response from generator object.
   *
   * Response body sent as JSON object using JSON.stringify(). Iterate through
   * formatConversation array to form response body.
   *
   * GPT response passed to writeToTextBox function for output. Once returned,
   * response logged to formatConversation array as 'assistant' message.
   */

  const fetchResponse = async () => {
    setIsPending(true);
    let newResponse = "";
    try {
      const response = await fetch("http://localhost:8000/request", {
        method: "POST",
        body: JSON.stringify(
          formatConversation.map((item) => ({
            role: item.role,
            content: item.content,
          }))
        ),
      });

      setUserInput("");

      if (!response.body) {
        throw new Error("Response is empty!");
      }

      const reader = response.body.getReader();
      newResponse = await writeToTextbox(reader);
    } catch (error) {
      console.error("There was an error processing the input", error);
    } finally {
      setFormatConversation((prevConversation) => [
        ...prevConversation,
        { role: "assistant", content: newResponse },
      ]);

      setIsPending(false);
    }
  };

  /**
   * Handles the streamed response and returns the decoded response for output to user
   * @param {ReadableStreamDefaultReader} reader Generator object from GPT
   * @returns {string} Decoded response from stream
   */

  async function writeToTextbox(reader) {
    const outputTextarea = document.getElementById("pendingResponse");
    let decodedResponse = "";
    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }
        let decodedChunk = new TextDecoder().decode(value);
        decodedResponse += new TextDecoder().decode(value);
        outputTextarea.innerHTML += decodedChunk;
      }
    } catch (error) {
      console.error("Error reading response:", error);
    } finally {
      reader.releaseLock();
      setLastResponse(decodedResponse);
      setIsPending(false);
    }
    return decodedResponse;
  }

  /**
   * HTTP 'POST' request to /request endpoint and call to writeToTextBox()
   * for handling the streamed response from generator object.
   *
   * Response body sent as JSON object using JSON.stringify(). Iterate through
   * tempConversation array to form response body.
   *
   * GPT response passed to writeToTextBox function for output. Once returned,
   * response logged to formatConversation array as 'assistant' message.
   */

  const fetchInitialResponse = async () => {
    setIsPending(true);
    try {
      const response = await fetch("http://localhost:8000/request", {
        method: "POST",
        body: JSON.stringify(
          tempConversation.map((item) => ({
            role: item.role,
            content: item.content,
          }))
        ),
      });

      if (!response.body) {
        throw new Error("Response is empty!");
      }

      const reader = response.body.getReader();
      let firstResponse = await writeToTextbox(reader);
      setLastResponse(firstResponse);
      setFormatConversation((prevConversation) => [
        ...prevConversation,
        { role: "assistant", content: firstResponse },
      ]);

      setIsPending(false);
    } catch (error) {
      console.error("There was an error processing the input", error);
    }
  };

  /**
   * HTTP 'POST' request to /saveGame endpoint.
   *
   * Response body sent as JSON object using JSON.stringify(). Iterate through
   * formatConversation array to form response body. Items in notes array
   * joined as a comma-separated list.
   *
   * api.py file returns unique save game key, which updates the userKey state.
   */

  const saveGame = async () => {
    setIsPending(true);
    try {
      const saveGamePayload = {
        context: JSON.stringify(
          formatConversation.map((item) => ({
            role: item.role,
            content: item.content,
          }))
        ),
        notes: userNoteList.join(", "),
      };

      const response = await fetch("http://localhost:8000/saveGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveGamePayload),
      });

      if (!response.ok) {
        throw new Error("Failed to save game");
      }

      const responseData = await response.json();

      const savedKey = responseData.key;
      setUserKey(savedKey);
    } catch (error) {
      console.error("Error saving game:", error);
    } finally {
      setIsPending(false);
      setIsGameSaved(true);
    }
  };

  /**
   *HTTP 'POST' request to /loadGame endpoint.
   *
   * Response body sent as JSON object using JSON.stringify(). Body includes
   * saved game key entered by user on startup page.
   *
   * api.py file returns JSON object with conversation and notes. States for
   * conversation and notes are updated with parsed responses.
   *
   *  @param {string} savedGameKey unique save game key
   *
   */

  const loadGame = async (savedGameKey) => {
    setIsPending(true);
    try {
      const response = await fetch("http://localhost:8000/loadGame", {
        method: "POST",
        body: JSON.stringify({
          key: savedGameKey,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to load game");
      }

      const responseData = await response.json();
      const contextArray = JSON.parse(responseData.context);
      const notesArray = responseData.notes.split(", ");
      setFormatConversation(contextArray);
      setUserNoteList(notesArray);
    } catch (error) {
      alert("Error loading game");
    } finally {
      setIsPending(false);
    }
  };

  /**
   * Add note to list of user notes. Takes the
   * current note list and appends the new note.
   */

  const updateUserNoteList = () => {
    setUserNoteList((prevUserNoteList) => [...prevUserNoteList, userNote]);
    setUserNote("");
  };

  /**
   * Deletes a specific note from userNoteList array
   * @param {int} index index of note in userNoteList
   * @returns updated list of user notes after deletion
   */

  const deleteNote = (index) => {
    setUserNoteList((prevUserNoteList) => {
      const updatedList = [...prevUserNoteList];
      updatedList.splice(index, 1);
      return updatedList;
    });
  };

  /**
   * Regular expression to parse most recent GPT response for <li> items to add to inventory.
   * If there is a match, the match is trimmed to a normal text respnose for display in inventory section.
   * @param {string} text most recent GPT response
   */

  const parseInventory = (text) => {
    const regex = /<li>(.*?)<\/li>/g;
    const matches = text.match(regex);

    if (matches) {
      const items = matches.map((match) =>
        match.replace("<li>", "").replace("</li>", "").trim()
      );
      setInventory(items);
    } else {
      setInventory([]);
    }
  };

  /**
   * Removes the most recent set of GPT-user interactions. Updates
   * formatConversation and lastResponse accordingly.
   */

  const undoAction = () => {
    if (formatConversation.length > 2) {
      setFormatConversation((prevConversation) =>
        prevConversation.slice(0, -2)
      );
      const newLast = formatConversation[formatConversation.length - 1].content;
    }
  };

  /**
   * Re-render component on change of state for lastResponse. Parses inventory of
   * new lastResponse
   */

  useEffect(() => {
    parseInventory(lastResponse);
  }, [lastResponse]);

  /**
   * Re-render component on change of state for formatConversation. If the last
   * item in formatConversation is a 'user' message, fetch GPT's response.
   */

  useEffect(() => {
    let lastItem = formatConversation[formatConversation.length - 1];
    if (formatConversation.length > 0 && lastItem.role !== "assistant") {
      fetchResponse();
    } else if (formatConversation.length > 0) {
      lastItem = formatConversation[formatConversation.length - 1];
      parseInventory(lastItem.content);
    }
  }, [formatConversation]);

  /**
   * Re-render component on change of state for tempConversation (initial response).
   * Call to fetchInitialResponse and pop the only message in tempConversation.
   */

  useEffect(() => {
    if (tempConversation.length === 1) {
      fetchInitialResponse();
      tempConversation.pop(0);
    }
  }, [tempConversation]);

  /**
   * Empty dependency - only re-render on component mount. Adds initial message
   * to tempConversation. Adds as a 'system' message.
   */

  useEffect(() => {
    if (initialMessage !== "") {
      let m = initialMessage;
      setTempConversation(() => [{ role: "system", content: m }]);
    }
  }, []);

  /**
   * Re-render component on change of state for savedGameKey (imported from startupPage component).
   * Calls loadGame function with savedGameKey as argument.
   */
  
  useEffect(() => {
    if (savedGameKey) {
      loadGame(savedGameKey);
    }
  }, [savedGameKey]);

  return (
    <div
      style={{
        display: "flex",
        margin: "20px",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div style={{ flex: 1, marginRight: "20px", height: "100vh" }}>
        <h1 style={{ textAlign: "center", marginTop: "0" }}>Your Adventure</h1>
        <div
          style={{
            height: "65%",
            border: "1px solid #ddd",
            padding: "30px",
            marginBottom: "10px",
            overflowY: "auto",
          }}
        >
          {formatConversation.map((item, index) => (
            <div
              key={index}
              style={{
                textAlign: item.role === "user" ? "right" : "left",
                marginBottom: "20px",
              }}
            >
              {item.role === "user" ? (
                <div>
                  {" "}
                  <strong>&#128100; You </strong> <div>{item.content}</div>{" "}
                </div>
              ) : (
                <div>
                  <strong>🧙🏻 Adventure Master </strong>{" "}
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              )}
            </div>
          ))}
          {isPending && (
            <div id="pendingResponse">
              <strong>Adventure Master </strong>
              <br />{" "}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Write your response here..."
            maxLength={150}
            style={{
              width: "97%",
              padding: "10px",
              fontSize: "20px",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <button id="submit" style={{ flex: 1 }} onClick={handleUserInput}>
            Enter ⬆️
          </button>
          <button style={{ flex: 1 }} onClick={undoAction}>
            Undo Last Action ↩️
          </button>
          <button style={{ flex: 1 }} onClick={saveGame}>
            Save Game &#x1F4BE;
          </button>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{ textAlign: "center", marginTop: "0" }}>
          Player Resources
        </h1>
        <div
          style={{
            height: "250px",
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            overflowY: "auto",
          }}
        >
          <h3 style={{ margin: "0", textAlign: "center" }}>Inventory</h3>
          <ul>
            {inventory.map((item, index) => (
              <li
                key={index}
                style={{ fontSize: "20px" }}
                dangerouslySetInnerHTML={{ __html: item }}
              ></li>
            ))}
          </ul>
        </div>

        <div
          style={{
            height: "250px",
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            marginTop: "20px",
            overflowY: "auto",
          }}
        >
          <h3 style={{ margin: "0", textAlign: "center" }}>Notepad</h3>
          {userNoteList.map((item, index) => (
            <p key={index} style={{ fontSize: "20px" }}>
              <span
                style={{ marginRight: "10px", cursor: "pointer" }}
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
        <input
          type="text"
          value={userNote}
          onChange={(e) => setUserNote(e.target.value)}
          placeholder="Write your notes here..."
        />
        <button
          onClick={(e) =>
            userNote === "" ? alert("Error: no note!") : updateUserNoteList()
          }
        >
          Add Note ➕
        </button>
        {isGameSaved && (
          <div
            style={{
              height: "auto",
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: "0", textAlign: "center" }}>Save Key</h3>
            <p
              id="saveKey"
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {userKey}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventurePage;
