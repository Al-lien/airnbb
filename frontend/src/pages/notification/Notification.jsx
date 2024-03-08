// pages && components
import NotificationCard from "../../components/notification/Notification";
import NotificationBooking from "../../components/notificationBooking/NotificationBooking";

// styles
import "./Notification.scss";

function Notification() {
  const notifications = [
    {
      id: 1,
      message: "Pensez à faire la déclaration PAJEMPLOI",
    },
    {
      id: 2,
      message: "Vous avez réservé une place à la crèche Picoti pour demain",
    },
    {
      id: 3,
      message: "Paiement accepté pour votre réservation",
    },
    {
      id: 4,
      message: "La crèche Picoti sera fermé lundi 30 mars",
    },
    {
      id: 5,
      message: "Pensez à faire la déclaration PAJEMPLOI",
    },
    {
      id: 6,
      message: "Vous avez réservé une place à la crèche Picoti pour demain",
    },
    {
      id: 7,
      message: "Paiement accepté pour votre réservation",
    },
  ];
  return (
    <main className="notification-container">
      <div className="notification-scroll">
        <h1 className="notification-title">Notification</h1>
        <NotificationBooking />
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            message={notification.message}
          />
        ))}
      </div>
    </main>
  );
}

export default Notification;
