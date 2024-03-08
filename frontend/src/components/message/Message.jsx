// proptypes
import PropTypes from "prop-types";

// library
import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

// styles
import "./Message.scss";

function Message({ user }) {
  const { name, profilPic, message, sent } = user;

  return (
    <button type="button" className="message">
      <img src={profilPic} alt="user" />
      <div className="message-text">
        <p>{name} </p>
        <small>{message}</small>
      </div>
      <div className="message-details">
        <p>{sent}</p>
        <ArrowUturnLeftIcon width={15} />
        <TrashIcon width={15} />
      </div>
    </button>
  );
}

Message.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profilPic: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    sent: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
