// proptypes
import PropTypes from "prop-types";

// react-router
import { Link, useLocation, useNavigate } from "react-router-dom";

// library
import { ChevronLeftIcon, UserPlusIcon } from "@heroicons/react/24/outline";

// styles
import "./AccountHeader.scss";

function Header({ userName }) {
  const { firstname, lastname } = userName;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header">
      {location.pathname === "/home/account" ||
      location.pathname === "/home/account/" ? (
        <h1 className="header-parentname">
          {firstname} {lastname}
        </h1>
      ) : (
        <button
          type="button"
          onClick={() => navigate(".")}
          aria-label="go back"
        >
          <ChevronLeftIcon width={30} />
        </button>
      )}

      {(location.pathname === "/home/account/children" ||
        location.pathname === "/home/account/children/") && (
        <Link to="/home/account/addchildren">
          <UserPlusIcon width={30} />
        </Link>
      )}
    </header>
  );
}

Header.propTypes = {
  userName: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
