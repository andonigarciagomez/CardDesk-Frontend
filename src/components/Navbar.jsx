import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm transition ${
    isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900"
  }`;

export default function Navbar() {
  const { token, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800">
            🃏
          </span>
          CardDesk
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navClass}>
            Inicio
          </NavLink>

          {token ? (
            <>
              <NavLink to="/my-cards" className={navClass}>
                Mis cartas
              </NavLink>
              <NavLink to="/profile" className={navClass}>
                Perfil
              </NavLink>
              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium hover:bg-red-500"
              >
                Salir
              </button>
              <span className="ml-2 hidden text-sm text-slate-400 sm:inline">
                {user?.email}
              </span>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navClass}>
                Registro
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}