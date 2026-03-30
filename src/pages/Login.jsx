import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    login({ email });
    navigate("/my-cards");
  };

  return (
    <section className="authPage">
      <div className="authWrap">
        <div className="authCard card">
          <div className="authTop">
            <span className="authIcon">🔐</span>
            <h1 className="authTitle">Iniciar sesión</h1>
            <p className="authSubtitle">
              Accede a tu colección de cartas y gestiona todo desde un solo lugar.
            </p>
          </div>

          <form onSubmit={onSubmit} className="form">
            <div className="formGroup">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="josune@email.com"
                required
              />
            </div>

            <div className="formGroup">
              <label className="label" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
              />
            </div>

            <button type="submit" className="btn btnPrimary authButton">
              Entrar
            </button>
          </form>

          <p className="authBottomText">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="authLink">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}