// react
import { useState } from "react";

// react-router
import { Link } from "react-router-dom";

// library
import { ChevronRightIcon } from "@heroicons/react/24/outline";

// custome hooks
import useLogin from "../../hooks/useLogin";

// styles
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPro, setIsPro] = useState(false);

  const { login, isLoading, error } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <main className="login-container">
      <button type="button" onClick={() => setIsPro(!isPro)}>
        {isPro ? "Parent" : "Pro"}
        <ChevronRightIcon width={15} />
      </button>
      <h3>
        {isPro
          ? "Je me connecte en tant que Pro"
          : "Je me connecte en tant que Parent"}
      </h3>
      <form className="layoutform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {/* value for input Pro/Parents 👇 */}
        {/* FOR LATER : must check is user's pro or not ! */}
        <input type="hidden" />

        <Link to="/signup">
          <small> Pas de compte ? </small>S'inscrire
        </Link>

        <button type="submit" disabled={isLoading}>
          Se connecter
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  );
}

export default Login;
