import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const getNavClass = ({ isActive }) =>
    isActive ? "navLink navLinkActive" : "navLink";

  const handleLogout = () => {
    logout(); // 🔥 IMPORTANTE
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="headerInner">
        <Link to="/" className="brand">
          <div className="navbarLogo">
            <img src={logo} alt="CardDesk logo" />
            <span>CardDesk</span>
          </div>
        </Link>

        <nav className="nav">
          <NavLink to="/" className={getNavClass}>
            Inicio
          </NavLink>

          {token ? (
            <>
              <NavLink to="/my-cards" className={getNavClass}>
                Mis cartas
              </NavLink>

              <NavLink to="/profile" className={getNavClass}>
                Perfil
              </NavLink>

              <button onClick={handleLogout} className="btn btnDanger">
                Salir
              </button>

              <span className="badge">👤 {user?.email}</span>
            </>
          ) : (
            <>
              <NavLink to="/login" className={getNavClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={getNavClass}>
                Registro
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}