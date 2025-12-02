import React, { useState } from "react";
import Login from "./Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);

  return (
    <div className="login-container">
      {user ? (
        <div className="welcome-card">
          <h1>Bem-vindo, {user.nome || user.email}!</h1>
          <p>Sistema de Presença Escolar integrado ao aplicativo de professores.</p>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
