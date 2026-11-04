export function MountainScene() {
  return (
    <div
      aria-label="Een berggeit staat op een rotsrichel en kijkt naar een verre bergtop in de mist"
      className="mountain-art"
      role="img"
    >
      <div className="mountain-art__sky" />
      <div className="mountain-art__light" />
      <div className="mountain-art__ridge mountain-art__ridge--far" />
      <div className="mountain-art__peak mountain-art__peak--west" />
      <div className="mountain-art__peak mountain-art__peak--main" />
      <div className="mountain-art__peak mountain-art__peak--east" />
      <div className="mountain-art__summit" />
      <div className="mountain-art__mist mountain-art__mist--high" />
      <div className="mountain-art__mist mountain-art__mist--low" />
      <div className="mountain-art__ground" />
      <div className="mountain-art__rock" />
      <div className="mountain-art__goat" aria-hidden="true">
        <i className="goat-body" />
        <i className="goat-neck" />
        <i className="goat-head" />
        <i className="goat-horn" />
        <i className="goat-leg goat-leg--one" />
        <i className="goat-leg goat-leg--two" />
        <i className="goat-leg goat-leg--three" />
        <i className="goat-leg goat-leg--four" />
      </div>
    </div>
  );
}