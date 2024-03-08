// libary
import { FunnelIcon } from "@heroicons/react/24/solid";

// styles
import "./Search.scss";

function Search() {
  return (
    <main className="search-container">
      <form className="dashboardform">
        <input type="text" id="searchbar" placeholder="Liliha Kapalama" />
      </form>
      <div>
        <div className="search-filter">
          <div>
            <FunnelIcon width={25} />
            <p>Filtre</p>
          </div>
          <p>Liste</p>
        </div>
      </div>
      <div className="search-map">
        <button id="1" type="button">
          12 €
        </button>
        <button id="2" type="button">
          10 €
        </button>
        <button id="3" type="button">
          32 €
        </button>
        <button id="4" type="button">
          15 €
        </button>
        <button id="5" type="button">
          20 €
        </button>
        <button id="6" type="button">
          16 €
        </button>
      </div>
      <div className="search-suggestions">
        <button type="button" className="suggestion">
          <span className="note">4.5 ⭐️</span>
          <h5>Crèche babilou</h5>
          <h6>Crèche municipale</h6>
        </button>

        <button type="button" className="suggestion">
          <span className="note">4.5 ⭐️</span>
          <h5>Crèche babilou</h5>
          <h6>Crèche municipale</h6>
        </button>

        <button type="button" className="suggestion">
          <span className="note">4.5 ⭐️</span>
          <h5>Crèche babilou</h5>
          <h6>Crèche municipale</h6>
        </button>

        <button type="button" className="suggestion">
          <span className="note">4.5 ⭐️</span>
          <h5>Crèche babilou</h5>
          <h6>Crèche municipale</h6>
        </button>

        <button type="button" className="suggestion">
          <span className="note">4.5 ⭐️</span>
          <h5>Crèche babilou</h5>
          <h6>Crèche municipale</h6>
        </button>
      </div>
    </main>
  );
}

export default Search;
