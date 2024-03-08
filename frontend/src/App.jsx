import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// custom hooks
import useAuthContext from "./hooks/useAuthContext";

// pages & components
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Layout from "./pages/layout/Layout";
import Home, { loader as NurseryLoader } from "./pages/home/Home";
import Dashboard, {
  loader as DashboardLoader,
} from "./pages/dashboard/Dashboard";
import Search from "./pages/search/Search";
import Account, { loader as AccountLoader } from "./pages/account/Account";
import Notification from "./pages/notification/Notification";
import Chat from "./pages/chat/Chat";
import Profil from "./pages/profil/Profil";
import Favorite from "./pages/favorite/Favorite";
import Children, { loader as ChildrenLoader } from "./pages/children/Children";
import Booking, { loader as MyBookingLoader } from "./pages/booking/Booking";
import AddChildren from "./pages/addChildren/AddChildren";
import EditChildren, {
  loader as EditLoader,
} from "./pages/editChildren/EditChildren";
import Nursery, {
  loader as SingleNurseryLoader,
} from "./pages/nursery/Nursery";

// styles
import "./App.scss";
import Reservation, {
  action,
  loader as reservationLoader,
} from "./pages/reservation/Reservation";

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/home" element={<Dashboard />} loader={DashboardLoader}>
          <Route index element={<Home />} loader={NurseryLoader} />
          <Route
            path="nursery/:id"
            element={<Nursery />}
            loader={SingleNurseryLoader}
          />
          <Route
            path="booking/:id"
            element={<Reservation />}
            loader={reservationLoader}
            action={action}
          />
          <Route path="search" element={<Search />} />
          <Route path="account" element={<Account />} loader={AccountLoader}>
            <Route index element={<Profil />} />
            <Route
              path="children"
              element={<Children />}
              loader={ChildrenLoader}
            />
            <Route path="addchildren" element={<AddChildren />} />
            <Route
              path="children/:id"
              element={<EditChildren />}
              loader={EditLoader}
            />
            <Route path="favorite" element={<Favorite />} />
            <Route
              path="mybooking"
              element={<Booking />}
              loader={MyBookingLoader}
            />
          </Route>
          <Route path="notification" element={<Notification />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
