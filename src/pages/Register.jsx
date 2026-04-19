import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Register() {
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
        "https://TU-BACKEND.onrender.com/api/auth/register", // ⚠️ CAMBIA ESTO
        {
          email,
          password,
        }
      );

      // 🔐 guardar token (si tu backend lo devuelve)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // 👤 guardar usuario
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 contexto
      login(res.data.user);

      // 🚀 redirigir
      navigate("/my-cards");

    } catch (err) {
      console.error(err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error al registrar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="authPage">
      <div className="authWrap">
        <div className="authCard card">

          <div className="authTop">
            <span className="authIcon">✨</span>
            <h1 className="authTitle">Crear cuenta</h1>
            <p className="authSubtitle">
              Regístrate y empieza a guardar tus cartas favoritas en tu colección.
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
                placeholder="Mínimo 8 caracteres"
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
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>

          </form>

          <p className="authBottomText">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="authLink">
              Inicia sesión
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}