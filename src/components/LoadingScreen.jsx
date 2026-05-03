export default function LoadingScreen() {
  return (
    <div className="loadingScreen">
      <div className="loadingContent">

        <img
          src="/src/assets/logo.png"
          alt="logo"
          className="loadingLogo"
        />

        <div className="loader"></div>

        <p>Cargando tu colección...</p>

      </div>
    </div>
  );
}