// react-router
import { Outlet, useLoaderData } from "react-router-dom";

// styles
import Header from "../../components/accountHeader/AccountHeader";

export async function loader() {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/airnbb/users/${id}`
  );
  const json = await response.json();
  return json;
}

function Account() {
  const user = useLoaderData();
  return (
    <>
      <Header userName={user} />
      <Outlet />
    </>
  );
}

export default Account;
