// proptypes
import PropTypes from "prop-types";

// react-router
import { useNavigate } from "react-router-dom";

// libray
import { PencilSquareIcon, UserMinusIcon } from "@heroicons/react/24/outline";

// custom hooks
import useDeleteChild from "../../hooks/useDeleteChild";

// assets
import ChildFace from "../../assets/childCareLogo.svg";

// styles
import "./Child.scss";

function Child({ child }) {
  const { deleteChild } = useDeleteChild();
  const { _id, firstname, lastname, birthday, walking, disabled, allergy } =
    child;
  const formattedBirthday = new Date(birthday).toLocaleDateString();
  const navigate = useNavigate();

  async function handleDelete() {
    await deleteChild(_id);
  }

  return (
    <div className="childCard">
      <div className="childCard__child">
        <img src={ChildFace} alt="child profil pic" width={50} id="childFace" />
      </div>
      <div className="childCard__name">
        <p>
          {firstname} {lastname}
        </p>
        <p>{formattedBirthday}</p>
      </div>
      <div className="childCard__spec">
        <span className={walking ? "details active" : "details"}>
          {walking ? "Marche" : "Ne marche pas"}
        </span>
        <span className={disabled ? "details active" : "details"}>
          {disabled ? "Handicap" : "Pas de handicap"}
        </span>
        <span className={allergy ? "details active" : "details"}>
          {allergy ? "Allergies" : "Pas d'allergie"}
        </span>
      </div>
      <div className="childCard__buttons">
        <button type="button" onClick={() => navigate(`${_id}`)}>
          <PencilSquareIcon alt="Edit child button" width={30} />
        </button>
        <button type="button" onClick={() => handleDelete()}>
          <UserMinusIcon alt="Delete child button" width={30} />
        </button>
      </div>
    </div>
  );
}

Child.propTypes = {
  child: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    walking: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    allergy: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Child;
