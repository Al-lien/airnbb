// proptypes
import PropTypes from "prop-types";

// react-router
import { Link, useLocation, useNavigate } from "react-router-dom";

// library
import { ChevronLeftIcon, UserPlusIcon } from "@heroicons/react/24/outline";

// utils
import { displayTitle } from "../../utils";

// styles
import "./AccountHeader.scss";

function Header({ userName }) {
  const { firstname, lastname } = userName;
  const navigate = useNavigate();
  const location = useLocation();

  let headerContent;
  const button = (
    <button
      className="goback-btn"
      type="button"
      onClick={() => navigate(".")}
      aria-label="go back"
    >
      <ChevronLeftIcon width={30} />
    </button>
  );

  switch (displayTitle(location.pathname)) {
    case "Mes favoris":
      headerContent = (
        <>
          {button}
          <h1 className="header-title">Mes favoris</h1>
        </>
      );
      break;
    case "Mes enfants":
      headerContent = (
        <>
          {button}
          <h1 className="header-title">Mes enfants</h1>
          <Link to="/home/account/addchildren">
            <UserPlusIcon width={30} />
          </Link>
        </>
      );
      break;
    case "Ajouter un enfant":
      headerContent = (
        <>
          {button}
          <h1 className="header-title">Ajouter un enfant</h1>
        </>
      );
      break;
    case "Mes reservations":
      headerContent = (
        <>
          {button}
          <h1 className="header-title">Mes reservations</h1>
        </>
      );
      break;
    case "Mon profil":
      headerContent = (
        <h1 className="header-parentname">
          {firstname} {lastname}
        </h1>
      );
      break;
    default:
      headerContent = (
        <>
          {button}
          <h1 className="header-title">Modifier mon enfant</h1>
        </>
      );
  }

  return <header className="header">{headerContent}</header>;
}

Header.propTypes = {
  userName: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
