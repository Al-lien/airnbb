// react
import { useEffect, useState } from "react";

// react-router
import { Link, useLoaderData } from "react-router-dom";

// library
import {
  CakeIcon,
  ChevronLeftIcon,
  InformationCircleIcon,
  MusicalNoteIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";

// styles
import "./Nursery.scss";
import Availability from "../../components/availability/Availability";

export async function loader({ params }) {
  const { id } = params;
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/airnbb/nursery/${id}`
  );
  const nurseryProfil = await response.json();
  return nurseryProfil;
}

function Nursery() {
  const nurseryProfil = useLoaderData();
  const { _id, address, name, place_max } = nurseryProfil;
  const { city, number, street, postcode } = address;

  const [isFavorite, setIsFavorite] = useState(false);
  const [availabilities, setAvailabilities] = useState();

  useEffect(() => {
    async function fetchAvailabilities() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/airnbb/availability/${_id}`
      );
      const json = await response.json();
      setAvailabilities(json);
    }
    fetchAvailabilities();
  }, []);

  return (
    <main className="nursery-profil-container">
      <header>
        <Link to="..">
          <ChevronLeftIcon width={30} />
        </Link>
        <h2>{name}</h2>
      </header>
      <div className="nursery-profil">
        <div className="nursery-profil__top">
          <button
            type="button"
            aria-label="add to favorite"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <HeartIcon
              width={30}
              className={isFavorite ? "isFavorite" : "isNotFavorite"}
            />
          </button>
        </div>
        <div className="nursery-profil__bottom">
          <h4>Présentation</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            aperiam facilis quia ratione non, tenetur harum et veritatis
            delectus officiis sint ipsa ?
          </p>
          <section className="informations">
            <InformationCircleIcon width={30} />
            <div>
              <p>
                <i>Horaire</i> : Lundi au Samedi de 9h à 18h
              </p>
              <p>
                <i>Adresse</i> : {number} {street}, {postcode}, {city}
              </p>
              <p>
                <i>Capacité</i> : {place_max}
              </p>
            </div>
          </section>
          <section className="reservations">
            <h4>Disponibilités</h4>
            <div className="disponibilities">
              {availabilities && availabilities[0] ? (
                availabilities
                  .slice(0, 6)
                  .map((av) => <Availability key={av._id} av={av} />)
              ) : (
                <p>Pas de place disponible pour l'instant...</p>
              )}
            </div>
          </section>
          <section>
            <h4>Activité</h4>
            <div className="activity">
              <p>
                <CakeIcon width={20} />
                Atelier patisserie
              </p>
              <p>
                <PuzzlePieceIcon width={20} />
                Jeux de société
              </p>
              <p>
                <MusicalNoteIcon width={20} />
                Éveil musical
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Nursery;
