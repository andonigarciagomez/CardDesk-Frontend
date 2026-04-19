import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "https://TU-BACKEND.onrender.com/api/auth/login", // ⚠️ CAMBIA ESTO
        {
          email,
          password,
        }
      );

      // 🔐 guardar token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 contexto
      login(res.data.user);

      // 🚀 redirigir
      navigate("/my-cards");

    } catch (err) {
      console.error(err);
      setError("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
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
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="josune@email.com"
                required
              />
            </div>

            <div className="formGroup">
              <label className="label">Contraseña</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
              />
            </div>

            {/* ❌ ERROR */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button
              type="submit"
              className="btn btnPrimary authButton"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
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