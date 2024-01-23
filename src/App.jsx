import { useState } from "react";
import Arweave from "arweave/web";
import "./App.css";
import {
  useActiveAddress,
  useConnection,
  useStrategy,
  useApi,
} from "@arweave-wallet-kit-beta/react";

const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  port: 443,
});

function App() {
  const { connected, connect, disconnect } = useConnection();
  const api = useApi();
  const address = useActiveAddress();
  const strategy = useStrategy();
  const [encrypted, setEncrypted] = useState(null);
  console.log({ api });
  // console.log({ api });
  // async function handleConnect() {
  //   await window.arweaveWallet.connect([
  //     "ACCESS_ADDRESS",
  //     "ACCESS_ALL_ADDRESSES",
  //     "ACCESS_ARWEAVE_CONFIG",
  //     "ACCESS_PUBLIC_KEY",
  //     "DECRYPT",
  //     "SIGN_TRANSACTION",
  //     "SIGNATURE",
  //     "ENCRYPT",
  //     "DISPATCH",
  //   ]);
  //   const address = window.arweaveWallet.getActiveAddress();
  //   // const user = await othent.connect();
  //   // console.log({ user });
  //   // if (user.walletAddress) {
  //   //   setIsConnected(true);
  //   //   setAddress(user.walletAddress);
  //   // }
  //   if (address) {
  //     setIsConnected(true);
  //     setAddress(address);
  //   }
  // }

  // async function handleDisconnect() {
  //   await othent.disconnect();
  //   setAddress("");
  //   setIsConnected(false);
  // }

  async function handleSign() {
    const transaction = await arweave.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body>Hello world!</body></html>',
    });
    transaction.addTag("Content-Type", "text/html");
    console.log("tx before sign,\n", transaction);

    const res = await api.sign(transaction);
    console.log("Sign,\n", res);
    // const txn = await arweave.transactions.post(transaction);
    // console.log(txn);
  }

  async function handleEncrypt() {
    const encoder = new TextEncoder(); // always utf-8
    const encoded = encoder.encode(
      "This is a string converted to a Uint8Array"
    );
    const encryptedData = await api.encrypt(encoded);
    setEncrypted(encryptedData);

    console.log({ encryptedData });
  }

  async function handleDecrypt() {
    if (!encrypted) {
      console.error("No encrypted data found");
      return;
    }

    const decrypted = await api.decrypt(encrypted);

    const encoder = new TextDecoder(); // always utf-8
    const decoded = encoder.decode(decrypted);

    console.log({ decoded });
  }
  async function handleSignAndSend() {
    const transaction = await arweave.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body>Hello world!</body></html>',
    });
    transaction.addTag("Content-Type", "text/html");
    console.log("tx before sign,\n", transaction);

    const signedTx = await api.sign(transaction);
    console.log({ signedTx }, { transaction });

    const txn = await arweave.transactions.post(transaction);
    console.log(txn, "tx");
  }

  if (connected) {
    return (
      <>
        <div>
          <h2>Connected</h2>
          <h3>{address}</h3>
          <h3>Strategy: {strategy}</h3>
          <button onClick={disconnect}>Disconnect</button>
          <button onClick={handleEncrypt}>Encrypt</button>
          <button onClick={handleDecrypt}>Decrypt</button>
          <button onClick={handleSign}>Sign</button>
          <button onClick={handleSignAndSend}>Sign and Send (Dispatch)</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h2>Connect to Othent</h2>
        <button onClick={connect}>Connect</button>
      </div>
    </>
  );
}

export default App;
