// react-router
import { Link } from "react-router-dom";

// library
import {
  ArrowRightEndOnRectangleIcon,
  HeartIcon,
  UsersIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

// custom hooks
import useLogout from "../../hooks/useLogout";

// styles
import "./Profil.scss";

function Profil() {
  const { logout } = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <main className="profil">
      <div>
        <Link to="favorite">
          <HeartIcon width={25} />
          Mes favoris
        </Link>
        <Link to="children">
          <UsersIcon width={25} /> Mon/mes enfant(s)
        </Link>
        <Link to="mybooking">
          <CalendarDaysIcon width={25} />
          Mes réservations
        </Link>
      </div>
      <div>
        <button type="button" onClick={handleLogout}>
          <ArrowRightEndOnRectangleIcon width={25} />
          Se déconnecter
        </button>
      </div>
    </main>
  );
}

export default Profil;
