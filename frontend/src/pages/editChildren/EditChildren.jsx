// react
import { useState } from "react";

// react-router
import { useLoaderData } from "react-router-dom";

// library
import { CheckCircleIcon } from "@heroicons/react/24/solid";

// custom hooks
import useAuthContext from "../../hooks/useAuthContext";
import useUpdateChild from "../../hooks/useUpdateChild";

// assets
import Babyplace from "../../assets/addchildimg.svg";

// styles
import "./EditChildren.scss";
import { formatDate } from "../../utils";

export async function loader({ params }) {
  const { id } = params;
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/airnbb/children/${id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  const child = await response.json();
  return child;
}

function EditChildren() {
  const child = useLoaderData();
  const { user } = useAuthContext();
  const { updateChild, isLoading, error } = useUpdateChild();
  const { _id, firstname, lastname, birthday, walking, disabled, allergy } =
    child;

  const [newfirstname, setFirstname] = useState(firstname);
  const [newlastname, setLastname] = useState(lastname);
  const [newbirthday, setBirthday] = useState(birthday);
  const [newwalking, setWalking] = useState(walking);
  const [newdisabled, setDisable] = useState(disabled);
  const [newallergy, setAllergy] = useState(allergy);

  async function handleUpdate(e) {
    e.preventDefault();
    const chilToUpdate = {
      parent_id: user.id,
      firstname: newfirstname,
      lastname: newlastname,
      birthday: newbirthday,
      walking: newwalking,
      disabled: newdisabled,
      allergy: newallergy,
    };

    await updateChild(chilToUpdate, _id);
  }

  return (
    <main className="addchildren-container">
      <img src={Babyplace} alt="babyplace" />
      {error && <div>{error}</div>}
      <form className="dashboardform" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Nom"
          value={newlastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={newfirstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date de naissance"
          value={formatDate(newbirthday)}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <div className="check">
          <input
            type="checkbox"
            id="walk"
            value={newwalking}
            onChange={() => setWalking(!newwalking)}
          />
          <label htmlFor="walk">
            <CheckCircleIcon
              width={30}
              className={newwalking ? "svgIsClicked" : "svgIsNotClicked"}
            />
            Mon enfant sait marcher.
          </label>
        </div>

        <div className="check">
          <input
            type="checkbox"
            id="disabilities"
            value={newdisabled}
            onChange={() => setDisable(!newdisabled)}
          />
          <label htmlFor="disabilities">
            <CheckCircleIcon
              width={30}
              className={newdisabled ? "svgIsClicked" : "svgIsNotClicked"}
            />
            Mon enfant a un handicap.
          </label>
        </div>

        <div className="check">
          <input
            type="checkbox"
            id="allergy"
            value={newallergy}
            onChange={() => setAllergy(!newallergy)}
          />
          <label htmlFor="allergy">
            <CheckCircleIcon
              width={30}
              className={newallergy ? "svgIsClicked" : "svgIsNotClicked"}
            />
            Mon enfant a des allergies.
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          Enregister les modifications
        </button>
      </form>
    </main>
  );
}

export default EditChildren;
