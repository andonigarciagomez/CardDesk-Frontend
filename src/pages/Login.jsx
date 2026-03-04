import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // DEMO: luego lo conectamos al backend
    login({ email });
    nav("/my-cards");
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-4 text-xl font-bold">Login</h2>

      <form
        onSubmit={onSubmit}
        className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
      >
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="josune@email.com"
            required
          />
        </div>

        <div>
          <label className="text-sm text-slate-300">Contraseña</label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button className="w-full rounded-xl bg-indigo-600 py-2 font-medium hover:bg-indigo-500">
          Entrar
        </button>

        <p className="text-sm text-slate-400">
          ¿No tienes cuenta?{" "}
          <Link className="text-indigo-400 hover:underline" to="/register">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}