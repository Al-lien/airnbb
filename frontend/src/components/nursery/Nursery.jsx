// proptypes
import PropTypes from "prop-types";

// react
import { useEffect, useState } from "react";

// react-router
import { Link } from "react-router-dom";

// library
import { HeartIcon } from "@heroicons/react/24/solid";

// pages && components
import Availability from "../availability/Availability";

// styles
import "./Nursery.scss";

function Nursery({ nursery }) {
  const { _id, address, name, place_max } = nursery;
  const { city, number, street, postcode } = address;

  const [isFavorite, setIsFavorite] = useState(false);
  const [availabilities, setAvailabilities] = useState();

  useEffect(() => {
    async function fetchAvailabilities() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/airnbb/availability/${_id}`
      );
      const json = await response.json();
      setAvailabilities(json);
    }
    fetchAvailabilities();
  }, []);

  return (
    <div className="nurseryCard">
      <div className="top">
        <button
          type="button"
          aria-label="add to favorite"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon
            width={30}
            className={isFavorite ? "isFavorite" : "isNotFavorite"}
          />
        </button>
        <div className="title">
          <Link to={`nursery/${_id}`}>{name}</Link>
        </div>
      </div>
      <div className="bottom">
        <div className="nurseryInfo">
          <div className="location">
            <p>{city}, à 500m</p>
            <small>
              {number}, {street}, {postcode}
            </small>
          </div>
          <div className="place_max">
            <h2>{place_max}</h2>
            <small>places</small>
          </div>
        </div>

        <div className="disponibilities">
          {availabilities && availabilities[0] ? (
            availabilities
              .slice(0, 6)
              .map((av) => <Availability key={av._id} av={av} />)
          ) : (
            <p>Pas de place disponible pour l'instant...</p>
          )}
        </div>
      </div>
    </div>
  );
}

Nursery.propTypes = {
  nursery: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    place_max: PropTypes.number.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      postcode: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Nursery;
