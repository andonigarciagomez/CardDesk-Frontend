import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Perfil</h2>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
        <p className="text-slate-300">
          Email: <span className="text-slate-100">{user?.email}</span>
        </p>
        <p className="mt-2 text-sm text-slate-400">
          (Luego añadiremos avatar, bio, y estadísticas de la colección)
        </p>
      </div>
    </div>
  );
}