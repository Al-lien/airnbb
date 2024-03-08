// assets
import NotFound from "../../assets/notFound.svg";

// styles
import "./Favorite.scss";

function Favorite() {
  return (
    <main className="favorite-container">
      <h3>Vous n'avez pas de crèche favorite !</h3>
      <img src={NotFound} alt="aucun résultat" />
    </main>
  );
}

export default Favorite;
