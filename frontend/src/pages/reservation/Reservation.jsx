// react
import { useEffect } from "react";

// react-router
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

// library
import {
  CakeIcon,
  ChevronLeftIcon,
  MusicalNoteIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

// utilities
import { formatReservationDate } from "../../utils";

// context
import useChildContext from "../../hooks/useChildContext";
import useAuthContext from "../../hooks/useAuthContext";

// styles
import "./Reservation.scss";

export async function reservationAction({ request }) {
  const formData = await request.formData();
  const child_id = formData.get("child");
  const availability_id = formData.get("availability");

  if (child_id !== "") {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/airnbb/booking/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          child_id,
          availability_id,
        }),
      }
    );
    if (response.ok) {
      return redirect("/home/account/mybooking");
    }
    if (!response.ok) {
      toast.error("Il y a eu un problème ...", { duration: 1000 });
    }
  }
  return null;
}

export async function loader({ params }) {
  const { id } = params;
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/airnbb/availability/single/${id}`
  );
  const availability = await response.json();
  return availability;
}

function Reservation() {
  const availability = useLoaderData();
  const { _id, day, nursery_id, place_booked, place_max } = availability;
  const { user } = useAuthContext();
  const { children, dispatch } = useChildContext();
  const { state } = useNavigation();

  useEffect(() => {
    const fetchChild = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/airnbb/children`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const userChildren = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_CHILDREN", payload: userChildren });
      }
    };
    fetchChild();
  }, [dispatch]);

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <main className="availability-container">
        <header>
          <Link to="..">
            <ChevronLeftIcon width={30} />
          </Link>
          <h2>{nursery_id.name}</h2>
        </header>
        <div className="reservation-profil">
          <div className="reservation-profil__top" />
          <div className="reservation-profil__bottom">
            <h3>Demande de réservation</h3>
            <h4>Date : {formatReservationDate(day)}</h4>
            <h5>Place disponible : {place_max - place_booked}</h5>
            <section>
              <h4>Activité</h4>
              <div className="activity">
                <p>
                  <CakeIcon width={20} />
                  Atelier patisserie
                </p>
                <p>
                  <PuzzlePieceIcon width={20} />
                  Jeux de société
                </p>
                <p>
                  <MusicalNoteIcon width={20} />
                  Éveil musical
                </p>
              </div>
            </section>
            <section className="choose-child">
              <Form method="POST">
                <select name="child">
                  <option value="">-- Selectionner un enfant --</option>
                  {children &&
                    children.map((child) => (
                      <option key={child._id} value={child._id}>
                        {child.firstname} {child.lastname}
                      </option>
                    ))}
                </select>
                <input type="hidden" name="availability" value={_id} />
                <button type="submit" disabled={state === "submitting"}>
                  {state === "submitting"
                    ? "Enregistrement ..."
                    : "Enregistrer"}
                </button>
              </Form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Reservation;
