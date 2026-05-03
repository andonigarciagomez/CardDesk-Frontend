import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.scss";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        { email, password }
      );

      // ✅ registro OK
      console.log("Registro OK:", res.data);

      // 👉 opcional: feedback visual
      alert("Usuario creado correctamente");

      navigate("/login");

    } catch (err) {
      console.error(err);

      // 🔥 AQUÍ ESTÁ LA CLAVE
      if (err.response) {
        // error del backend
        setError(err.response.data.message || "Error al registrarse");
      } else {
        // error de red
        setError("No se puede conectar con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="authPage">
      <div className="authWrap">
        <div className="authCard">
          <div className="authTop">
            <div className="authIcon">✨</div>
            <h1 className="authTitle">Crear cuenta</h1>
            <p className="authSubtitle">
              Empieza tu colección
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
              <label>Email</label>
              <input
                className="authInput"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="formGroup">
              <label>Contraseña</label>
              <input
                className="authInput"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className="authButton" disabled={loading}>
              {loading ? "Creando..." : "Crear cuenta"}
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