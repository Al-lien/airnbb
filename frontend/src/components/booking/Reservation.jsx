// proptypes
import PropTypes from "prop-types";

// react-router-dom
import { Form } from "react-router-dom";

// library
import { CalendarDaysIcon, TrashIcon } from "@heroicons/react/24/outline";

// assets
import ChildIcon from "../../assets/childIcon.png";
import ParentsIcon from "../../assets/parentsIcon.png";

// utilities
import { formatMyBookingDate } from "../../utils";

// styles
import "./Reservation.scss";

function Booking({ child, date, _id }) {
  const {
    firstname: childfirstname,
    lastname: childlastname,
    parent_id,
  } = child;
  const { firstname: parentfirstname, lastname: parentlastname } = parent_id;

  return (
    <div type="button" className="booking">
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
        <Form method="DELETE">
          <input type="hidden" name="_id" value={_id} />
          <button type="submit" aria-label="delete reservation">
            <TrashIcon width={20} />
          </button>
        </Form>
      </div>
    </div>
  );
}

Booking.propTypes = {
  _id: PropTypes.string.isRequired,
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
