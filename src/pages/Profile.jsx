import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.scss";

export default function Profile() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  
  // Estados para datos personales editables
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "Maestro Coleccionista",
    location: "Kanto / Ciudad Domino",
    bio: "Coleccionista de cartas raras desde 2024. ¡Busco el Dragón Blanco de Ojos Azules!"
  });

  // Estado para la imagen del avatar
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <section className="profilePage">
      <div className="profileHeader">
        <h1>🎴 Mi Deck de Entrenador</h1>
        <button onClick={handleLogout} className="btn btnDanger">Cerrar sesión</button>
      </div>

      <div className="profileMainCard">
        {/* Sección de Avatar con subida de imagen */}
        <div className="avatarSection" onClick={() => fileInputRef.current.click()}>
          <div className="avatarDisplay">
            {avatar ? (
              <img src={avatar} alt="Avatar" />
            ) : (
              <span className="avatarPlaceholder">{user.email?.charAt(0).toUpperCase()}</span>
            )}
            <div className="avatarOverlay"><span>Cambiar</span></div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            style={{ display: "none" }} 
            accept="image/*"
          />
        </div>

        {/* Datos Personales */}
        <div className="personalDetails">
          {isEditing ? (
            <div className="editForm">
              <input 
                type="text" 
                value={profileData.name} 
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
              <input 
                type="text" 
                value={profileData.location} 
                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
              />
              <textarea 
                value={profileData.bio} 
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              />
              <button className="btn btnSuccess" onClick={() => setIsEditing(false)}>Guardar</button>
            </div>
          ) : (
            <div className="displayDetails">
              <h2>{profileData.name}</h2>
              <p className="location">📍 {profileData.location}</p>
              <p className="bio">"{profileData.bio}"</p>
              <p className="emailText">📧 {user.email}</p>
              <button className="btn btnGhost" onClick={() => setIsEditing(true)}>Editar Perfil</button>
            </div>
          )}
        </div>
      </div>

      {/* Stats con un diseño de "Tarjetas de Poder" */}
      <div className="statsTitle">
        <h3>Estadísticas de Colección</h3>
      </div>
      
      <div className="profileStatsGrid">
        <div className="statCard total">
          <span className="statIcon">⭐</span>
          <div className="statInfo">
            <h4>{favorites.length}</h4>
            <p>Cartas Totales</p>
          </div>
        </div>

        <div className="statCard magic">
          <span className="statIcon">🪄</span>
          <div className="statInfo">
            <h4>{favorites.filter(f => f.source === "magic").length}</h4>
            <p>Magic</p>
          </div>
        </div>

        <div className="statCard pokemon">
          <span className="statIcon">⚡</span>
          <div className="statInfo">
            <h4>{favorites.filter(f => f.source === "pokemon").length}</h4>
            <p>Pokémon</p>
          </div>
        </div>

        <div className="statCard yugioh">
          <span className="statIcon">🐉</span>
          <div className="statInfo">
            <h4>{favorites.filter(f => f.source === "yugioh").length}</h4>
            <p>Yu-Gi-Oh</p>
          </div>
        </div>
      </div>
    </section>
  );
}