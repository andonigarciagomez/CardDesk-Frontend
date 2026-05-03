import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi"; // ✅ Usamos tu servicio
import { useAuth } from "../context/AuthContext";
import "../styles/auth.scss";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // ✅ Llamamos a la función que ya tienes definida en authApi.js
      const data = await loginUser({ email, password });

      // Guardamos los datos en el contexto (token y user)
      login(data);

      // Redirigimos al perfil
      navigate("/profile");

    } catch (err) {
      // Mostramos el mensaje de error que viene del servidor (o uno genérico)
      setError(err.message || "Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="authPage">
      <div className="authWrap">
        <div className="authCard">
          <div className="authTop">
            <div className="authIcon">🔐</div>
            <h1 className="authTitle">Iniciar sesión</h1>
            <p className="authSubtitle">Accede a tu colección</p>
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
              <div className="passwordWrap">
                <input
                  className="authInput"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="togglePassword"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {error && <div className="authError">{error}</div>}

            <button className="authButton" disabled={loading}>
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