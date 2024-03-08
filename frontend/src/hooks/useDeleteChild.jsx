// react
import { useState } from "react";

// context

import useChildContext from "./useChildContext";
import useAuthContext from "./useAuthContext";

function useDeleteChild() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const { dispatch } = useChildContext();

  const deleteChild = async (childId) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/airnbb/children/${childId}`,
      {
        method: "DELETE",
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
      dispatch({ type: "DELETE_CHILDREN", payload: child });
    }
  };
  return { deleteChild, isLoading, error };
}

export default useDeleteChild;
