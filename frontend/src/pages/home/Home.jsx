// react-router
import { useLoaderData } from "react-router-dom";

// pages && components
import Nursery from "../../components/nursery/Nursery";

// styles
import "./Home.scss";

export async function loader() {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/airnbb/nursery`
  );
  const json = await response.json();
  return json;
}

function Home() {
  const nurseries = useLoaderData();

  return (
    <main className="home-container">
      <div className="list">
        {nurseries.map((nursery) => {
          return <Nursery key={nursery._id} nursery={nursery} />;
        })}
      </div>
    </main>
  );
}

export default Home;
