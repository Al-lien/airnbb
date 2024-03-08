// react
import { useState } from "react";

// library
import { CheckCircleIcon } from "@heroicons/react/24/solid";

// assets
import Babyplace from "../../assets/addchildimg.svg";

// styles
import "./AddChildren.scss";
import useCreateChild from "../../hooks/useCreateChild";
import useAuthContext from "../../hooks/useAuthContext";

function AddChildren() {
  const { user } = useAuthContext();
  const { createChild, isLoading, error } = useCreateChild();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [walking, setWalking] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [allergy, setAllergy] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    const newChild = {
      parent_id: user.id,
      firstname,
      lastname,
      birthday,
      walking,
      disabled,
      allergy,
    };

    await createChild(newChild);
  }

  return (
    <main className="addchildren-container">
      <img src={Babyplace} alt="babyplace" />
      <form className="dashboardform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date de naissance"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <div className="check">
          <input
            type="checkbox"
            id="walk"
            onChange={() => setWalking(!walking)}
          />
          <label htmlFor="walk">
            <CheckCircleIcon
              width={30}
              className={walking ? "svgIsClicked" : "svgIsNotClicked"}
            />
            Mon enfant sait marcher.
          </label>
        </div>

        <div className="check">
          <input
            type="checkbox"
            id="disabilities"
            onChange={() => setDisable(!disabled)}
          />
          <label htmlFor="disabilities">
            <CheckCircleIcon
              width={30}
              className={disabled ? "svgIsClicked" : "svgIsNotClicked"}
            />
            Mon enfant a un handicap.
          </label>
        </div>

        <div className="check">
          <input
            type="checkbox"
            id="allergy"
            onChange={() => setAllergy(!allergy)}
          />
          <label htmlFor="allergy">
            <CheckCircleIcon
              width={30}
              className={allergy ? "svgIsClicked" : "svgIsNotClicked"}
            />
            Mon enfant a des allergies.
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          Ajouter mon enfant
        </button>
        {error && <div>{error}</div>}
      </form>
    </main>
  );
}

export default AddChildren;
