import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { token } = useAuth();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tu colección, en el móvil 📱</h1>
      <p className="text-slate-300">
        Guarda cartas exclusivas (Magic, fútbol, lo que quieras) y míralas en
        modo colección.
      </p>

      {token ? (
        <Link
          to="/my-cards"
          className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500"
        >
          Ir a Mis cartas
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-xl bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500"
          >
            Entrar
          </Link>
          <Link
            to="/register"
            className="rounded-xl border border-slate-700 px-4 py-2 font-medium hover:bg-slate-900"
          >
            Crear cuenta
          </Link>
        </div>
      )}
    </div>
  );
}