// react-router
import { Navigate, Outlet } from "react-router-dom";

// pages && components
import Navbar from "../../components/navbar/Navbar";

// styles
import "./Dashboard.scss";

export async function loader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" />;
  }
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/airnbb/users/${user.id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  const connectedUser = await response.json();
  return connectedUser;
}

function Dashboard() {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
}

export default Dashboard;
