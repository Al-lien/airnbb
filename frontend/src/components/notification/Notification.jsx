// proptypes
import PropTypes from "prop-types";

// library
import { ChevronRightIcon } from "@heroicons/react/24/outline";

// styles
import "./Notification.scss";

function NotificationCard({ message }) {
  return (
    <button type="button" className="notification-card">
      <div className="text">
        <p>{message}</p>
        <ChevronRightIcon width={15} />
      </div>
    </button>
  );
}

NotificationCard.propTypes = {
  message: PropTypes.string.isRequired,
};

export default NotificationCard;
