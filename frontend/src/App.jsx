import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [backendMessage, setBackendMessage] = useState("Loading...");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/")
      .then(res => setBackendMessage(res.data.message))
      .catch(() => setBackendMessage("Error connecting to backend"));
  }, []);

  const askQuestion = async () => {
    if (!question) return;
    try {
      const res = await axios.post("http://127.0.0.1:8000/ask", { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error connecting to backend");
    }
  };

  return (
    <div className="App">
      <div className="logos">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <hr />

      <div className="backend-test">
        <h2>Backend Status:</h2>
        <p>{backendMessage}</p>
      </div>

      <hr />

      <div className="learni-section">
        <h2>Ask LearniGPT:</h2>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Type your question..."
        />
        <button onClick={askQuestion}>Ask</button>
        {answer && (
          <div className="answer">
            <strong>Answer:</strong> {answer}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;