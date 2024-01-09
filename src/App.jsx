import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(true);
  const [address, setAddress] = useState("");

  async function handleConnect() {
    //
  }

  async function handleDisconnect() {
    //
  }

  if (isConnected) {
    return (
      <>
        <div>
          <h2>Connected</h2>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h2>Connect to Othent</h2>
        <button onClick={handleConnect}>Connect</button>
      </div>
    </>
  );
}

export default App;
