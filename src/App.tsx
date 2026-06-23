import { useState } from "react";
import "./App.css";
import Parent from "./components/Parent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React + useThunk</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          Component count is {count}
        </button>
      </div>
      <Parent />
    </>
  );
}

export default App;
