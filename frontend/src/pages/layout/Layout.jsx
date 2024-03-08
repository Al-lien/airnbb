// react-router
import { Outlet } from "react-router-dom";

// styles
import "./Layout.scss";

function Layout() {
  return (
    <main className="layout-container">
      <Outlet />
    </main>
  );
}

export default Layout;
