// react-router
import { useLoaderData } from "react-router-dom";

// library
import toast, { Toaster } from "react-hot-toast";

// pages && components
import Reservation from "../../components/booking/Reservation";

// styles
import "./Booking.scss";

export async function bookingAction({ request }) {
  const formData = await request.formData();
  const _id = formData.get("_id");

  if (_id !== "") {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/airnbb/booking/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      toast.success("Reservation supprimée", { duration: 1000 });
    }
    if (!response.ok) {
      toast.error("Il y a eu un problème ...", { duration: 1000 });
    }
  }
  return null;
}

export async function loader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/airnbb/booking/parent/${user.id}`
  );
  const bookings = await response.json();

  return bookings;
}

function Booking() {
  const userBookings = useLoaderData();

  return (
    <main className="booking-container">
      <Toaster position="top-center" reverseOrder={false} />
      <header className="booking-header">
        <button type="button" className="active">
          Réservations
        </button>
        <button type="button" className="inactive">
          Jour
        </button>
        <button type="button" className="inactive">
          Semaine
        </button>
        <button type="button" className="inactive">
          Mois
        </button>
      </header>
      <div className="booking-list-container">
        <div className="booking-list">
          {userBookings.length > 0 ? (
            userBookings.map((booking) => (
              <Reservation
                key={booking._id}
                _id={booking._id}
                child={booking.child_id}
                date={booking.availability_id.day}
              />
            ))
          ) : (
            <p>Vous n'avez pas de réservation ...</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Booking;
