// proptypes
import PropTypes from "prop-types";

// library
import { CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/outline";

// assets
import ChildIcon from "../../assets/childIcon.png";
import ParentsIcon from "../../assets/parentsIcon.png";

// utilities
import { formatMyBookingDate } from "../../utils";

// styles
import "./Reservation.scss";

function Booking({ child, date }) {
  const {
    firstname: childfirstname,
    lastname: childlastname,
    parent_id,
  } = child;
  const { firstname: parentfirstname, lastname: parentlastname } = parent_id;

  return (
    <button type="button" className="booking">
      <div className="booking-user">
        <div className="icons">
          <img src={ChildIcon} alt="children" />
          <p>
            {childfirstname} {childlastname}
          </p>
        </div>
        <div className="icons">
          <img src={ParentsIcon} alt="parents" />
          <p>
            {parentfirstname} {parentlastname}
          </p>
        </div>
      </div>

      <div className="booking-date">
        <CalendarDaysIcon width={30} />
        <p>{formatMyBookingDate(date)}</p>
        <button type="button" aria-label="delete reservation">
          <TrashIcon width={20} />
        </button>
      </div>
    </button>
  );
}

Booking.propTypes = {
  child: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    parent_id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
};

export default Booking;
