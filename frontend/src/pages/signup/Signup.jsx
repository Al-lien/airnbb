// react
import { useState } from "react";

// react-router
import { Link } from "react-router-dom";

// custom hooks
import useSignup from "../../hooks/useSignup";

// style
import "./Signup.scss";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [ispro, setIspro] = useState(false);

  const { signup, isLoading, error } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();

    await signup(email, password, lastname, firstname, address, phone, ispro);
  }

  return (
    <main className="signup-container">
      <h3>Je m'inscris sur Airnbb</h3>
      <form className="layoutform" onSubmit={handleSubmit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        {/* ... */}
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Mot de passe"
        />
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirmer le mot de passe"
        />
        <input
          type="text"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          placeholder="Nom"
        />
        <input
          type="text"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          placeholder="Prénom"
        />
        <input
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="Adresse"
        />
        <input
          type="tel"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          placeholder="Téléphone mobile"
        />
        <fieldset>
          <input
            type="checkbox"
            id="pro"
            onChange={(e) => setIspro(e.target.value)}
            value={ispro}
          />
          <label htmlFor="pro">Je suis un professionnel</label>
        </fieldset>
        <Link to="/login">
          <small> Vous avez déjà compte ? </small>Se connecter
        </Link>
        <button type="submit" disabled={isLoading}>
          S'inscrire
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  );
}

export default Signup;
