import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";

export default function Profile() {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  return (
    <section className="profilePage">
      <div className="card">
        <div className="cardBody">
          <h1 className="h1">Mi perfil</h1>

          <div className="profileInfo">
            <p className="p">
              <strong>Email:</strong> {user?.email}
            </p>

            <p className="p">
              <strong>Cartas favoritas:</strong> {favorites.length}
            </p>
          </div>

          <div className="profileActions">
            <Link to="/my-cards" className="btn btnPrimary">
              Ver mi colección
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}