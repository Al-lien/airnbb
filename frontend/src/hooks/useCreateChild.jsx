// react
import { useState } from "react";

// react-router
import { useNavigate } from "react-router-dom";

// context
import useAuthContext from "./useAuthContext";
import useChildContext from "./useChildContext";

function useCreateChild() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { dispatch } = useChildContext();

  const createChild = async (newChild) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/airnbb/children`,
      {
        method: "POST",
        body: JSON.stringify(newChild),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const child = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(child.error);
    }

    if (response.ok) {
      setIsLoading(false);
      setError(null);
      dispatch({ type: "CREATE_CHILDREN", payload: child });
      navigate("../children");
    }
  };
  return { createChild, isLoading, error };
}

export default useCreateChild;
