// react
import { useState } from "react";

// react-router
import { useNavigate } from "react-router-dom";

// context
import useAuthContext from "./useAuthContext";

function useUpdateChild() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const { user } = useAuthContext();

  const updateChild = async (updates, id) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/airnbb/children/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updates),
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
      navigate("../children");
    }
  };
  return { updateChild, isLoading, error };
}

export default useUpdateChild;
