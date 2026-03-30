import logo from "../assets/logo.png";

export default function SplashScreen({ fadeOut }) {
  return (
    <div className={`splashScreen ${fadeOut ? "fadeOut" : ""}`}>
      <div className="splashScreen__content">
        <img src={logo} alt="CardDesk logo" className="splashScreen__logo" />

        <h1 className="splashScreen__title">CardDesk</h1>

        <p className="splashScreen__text">
          Explora, guarda y colecciona tus cartas favoritas
        </p>

        <div className="splashScreen__loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}