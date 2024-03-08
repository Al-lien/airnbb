// react
import { useEffect } from "react";

// pages && components
import { useLoaderData } from "react-router-dom";
import Child from "../../components/child/Child";

// styles
import "./Children.scss";
import useChildContext from "../../hooks/useChildContext";

export async function loader() {
  return JSON.parse(localStorage.getItem("user"));
}

function Children() {
  const user = useLoaderData();
  const { children, dispatch } = useChildContext();

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
    <main className="children-container">
      {children &&
        children.map((child) => <Child key={child._id} child={child} />)}
    </main>
  );
}

export default Children;
