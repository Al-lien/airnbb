// proptypes
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// utilities
import { formatAvailibityDate } from "../../utils";

function Availability({ av }) {
  const navigate = useNavigate();

  function handleClick(id) {
    return navigate(`../../home/booking/${id}`);
  }

  return (
    <button
      type="button"
      disabled={av.isFull}
      onClick={() => handleClick(av._id)}
    >
      {formatAvailibityDate(av.day)}
    </button>
  );
}

Availability.propTypes = {
  av: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nursery_id: PropTypes.shape({
      address: PropTypes.shape({
        city: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        street: PropTypes.string.isRequired,
        postcode: PropTypes.number.isRequired,
      }).isRequired,
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      place_max: PropTypes.number.isRequired,
    }).isRequired,
    isFull: PropTypes.bool.isRequired,
    place_max: PropTypes.number.isRequired,
    day: PropTypes.string.isRequired,
    place_booked: PropTypes.number.isRequired,
  }).isRequired,
};

export default Availability;
