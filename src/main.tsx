import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <h1 className="title">🍳 Bienvenidos a Nuestro sabor 🍳</h1>
    <App />
  </React.StrictMode>
);
