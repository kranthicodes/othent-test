import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import OthentStrategy from "@arweave-wallet-kit-beta/othent-strategy";
import { ArweaveWalletKit } from "@arweave-wallet-kit-beta/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ArweaveWalletKit
    config={{
      strategies: [new OthentStrategy()],
      permissions: [
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
        "ACCESS_PUBLIC_KEY",
        "SIGNATURE",
        "DISPATCH",
        "DECRYPT",
        "ENCRYPT",
        "ACCESS_ALL_ADDRESSES",
        "ACCESS_ARWEAVE_CONFIG",
      ],
      ensurePermissions: true,
    }}
    theme={{
      displayTheme: "light",
    }}
  >
    <App />
  </ArweaveWalletKit>
);
