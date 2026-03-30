# 🃏 CardDesk Frontend

Aplicación web para **gestionar y visualizar colecciones de cartas** (Magic, fútbol, Pokémon, etc.).

Cada usuario puede **registrarse, iniciar sesión y visualizar su colección personal de cartas en formato grid**, optimizado para **visualización en móvil mediante QR**.

Este repositorio contiene **la parte Frontend** de la aplicación.

---

# 🚀 Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- Axios
- CSS

---

# 📦 Estructura del proyecto
src
│
├── api
│ ├── authApi.js
│ └── cardsApi.js
│
├── components
│ ├── Navbar.jsx
│ ├── CardGrid.jsx
│ └── ProtectedRoute.jsx
│
├── context
│ └── AuthContext.jsx
│
├── pages
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Profile.jsx
│ └── MyCards.jsx
│
├── router
│ └── AppRouter.jsx
│
├── styles
│ └── globals.css
│
├── App.jsx
└── main.jsx


---

# 🧩 Funcionalidades actuales

✔ Registro de usuarios  
✔ Login de usuarios  
✔ Control de rutas protegidas  
✔ Perfil de usuario  
✔ Visualización de cartas en **grid estilo colección**  
✔ Navegación mediante **React Router**  
✔ Gestión de autenticación mediante **Context API**

---

# 🃏 Vista de colección

Las cartas se muestran en formato **grid responsive**, simulando una colección real.


Diseñado para:

- visualizar colecciones fácilmente
- adaptarse a móvil
- permitir acceso mediante **QR**

---
