// react
import { useState } from "react";

// react-router
import { useNavigate } from "react-router-dom";

// context
import useAuthContext from "./useAuthContext";

function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  /* FOR LATER : must check is user's pro or not ! */
  async function login(email, password) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/airnbb/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /* FOR LATER : must check is user's pro or not ! */
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate("/home");
    }
  }

  return { login, isLoading, error };
}

export default useLogin;
