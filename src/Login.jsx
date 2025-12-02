import React, { useState, useEffect } from "react";
import "./App.css";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchDashboard(token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("senha", password);

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "ok") {
        localStorage.setItem("token", data.token);
        setUser(data.usuario);
        alert(`Bem-vindo ${data.usuario.nome}!`);
        fetchDashboard(data.token);
      } else {
        alert(data.mensagem);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar fazer login.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDashboardData(null);
    alert("Logout realizado!");
  };

  const fetchDashboard = async (token) => {
    try {
      const response = await fetch("http://localhost:8000/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao acessar dashboard. Token inválido ou expirado.");
      handleLogout();
    }
  };

  return (
    <div className="page-bg">
      <div className="center-wrap">
        <div className="card-root">
          {!user ? (

            <div className="card-left">
              <div className="left-inner">
                <div className="logo-row">
                  <img src="src/imagens/logo-fingger.jpeg" alt="logo" className="logo-img" />
                  <span className="brand">Fingerprint</span>
                </div>

                <h1 className="title">Login</h1>
                <p className="subtitle">Por favor, insira suas credenciais</p>

                <form className="form-area" onSubmit={handleLogin}>
                  <div className="input-row">
                    <FaEnvelope className="icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.com"
                      required
                    />
                  </div>

                  <div className="input-row">
                    <FaLock className="icon" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="senha123"
                      required
                    />
                  </div>

                  <button className="btn-primary" type="submit">Login</button>
                </form>
              </div>
            </div>
          ) : (
            
            <div className="card-left">
              <div className="left-inner">
                <h1 className="title">Dashboard</h1>
                <p>Bem-vindo, {user.nome} ({user.cargo})</p>
                {dashboardData && <pre>{JSON.stringify(dashboardData, null, 2)}</pre>}
                <button className="btn-primary" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}

          <div className="card-right">
            <div className="right-frame">
              <div className="right-gradient">
                <img
                  src="src/imagens/fingerprint-illustration.jpeg"
                  alt="illustration"
                  className="illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
