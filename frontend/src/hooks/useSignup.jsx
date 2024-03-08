// react
import { useState } from "react";

// react-router
import { useNavigate } from "react-router-dom";

// context
import useAuthContext from "./useAuthContext";

function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  /* FOR LATER : must check is user's pro or not ! */
  async function signup(
    email,
    password,
    lastname,
    firstname,
    address,
    phone,
    ispro
  ) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/airnbb/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /* FOR LATER : must check is user's pro or not ! */
        body: JSON.stringify({
          email,
          password,
          lastname,
          firstname,
          address,
          phone,
          ispro,
        }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the authContext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      navigate("/home");
    }
  }

  return { signup, isLoading, error };
}

export default useSignup;
