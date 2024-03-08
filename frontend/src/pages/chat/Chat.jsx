// library
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

// pages && components
import Message from "../../components/message/Message";

// styles
import "./Chat.scss";

// assets
import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.jpg";
import user3 from "../../assets/user3.jpg";
import user4 from "../../assets/user4.jpg";
import user5 from "../../assets/user5.jpg";

function Chat() {
  const users = [
    {
      id: 1,
      name: "Beau Ozinga",
      profilPic: user1,
      message: "Lorem ipsum dolor sit...",
      sent: "10 : 20",
    },
    {
      id: 2,
      name: "Antoinette Gresh",
      profilPic: user2,
      message: "Assumenda placeat...",
      sent: "11 : 43",
    },
    {
      id: 3,
      name: "Trudi Rombalski",
      profilPic: user3,
      message: "Labore fugit consequ...",
      sent: "08 : 12",
    },
    {
      id: 4,
      name: "Olene Shocklee",
      profilPic: user4,
      message: "Labore maiores sint...",
      sent: "14 : 15",
    },
    {
      id: 5,
      name: "Sheldon Groce",
      profilPic: user5,
      message: "Ut, repellat cum. Illum...",
      sent: "19 : 54",
    },
  ];

  return (
    <>
      <header className="header chat">
        <h1 className="header-parentname chatname">Jane Doe</h1>
        <p>
          Statut : <span>connectée</span> <CheckBadgeIcon width={20} />
        </p>
      </header>

      <main className="chat-container">
        <div className="chat-sort">
          <button type="button">Tous les messages</button>
          <button type="button">Non lus</button>
          <button type="button">Lus</button>
        </div>

        {users.map((user) => (
          <Message key={user.id} user={user} />
        ))}
      </main>
    </>
  );
}

export default Chat;
