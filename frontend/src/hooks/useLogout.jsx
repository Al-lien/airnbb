// react-router
import { useNavigate } from "react-router-dom";

// context
import useAuthContext from "./useAuthContext";

function useLogout() {
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  return { logout };
}

export default useLogout;
