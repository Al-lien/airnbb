// pages && components
import { useLoaderData } from "react-router-dom";
import Reservation from "../../components/booking/Reservation";

// styles
import "./Booking.scss";

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
      <header className="booking-header">
        <button type="button" className="active">
          Toutes les réservations
        </button>
        <button type="button" className="inactive">
          jour
        </button>
        <button type="button" className="inactive">
          semaine
        </button>
        <button type="button" className="inactive">
          mois
        </button>
      </header>
      <div className="booking-list-container">
        <div className="booking-list">
          {userBookings.length > 0 ? (
            userBookings.map((booking) => (
              <Reservation
                key={booking._id}
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
