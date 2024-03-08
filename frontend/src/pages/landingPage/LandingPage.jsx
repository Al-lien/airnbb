// react

// react-router
import { Link } from "react-router-dom";

// library
import { ChevronRightIcon } from "@heroicons/react/24/outline";

// assets
import Babyplace from "../../assets/babyplace1.png";
import Logo from "../../assets/babyplacelogo.svg";

// styles
import "./LandingPage.scss";

function LandingPage() {
  return (
    <main className="landingpage-container">
      <img src={Babyplace} alt="babyplace" className="babyplace" />
      <div className="title">
        <img src={Logo} alt="airnbb logo" />
        <h1>Airnbb</h1>
        <h2>Garde d'enfant à la demande</h2>
      </div>
      <p>Trouver un.e professionnel.le de la garde d'enfant</p>
      <Link to="login">
        Suivant
        <ChevronRightIcon width={25} />
      </Link>
    </main>
  );
}

export default LandingPage;
