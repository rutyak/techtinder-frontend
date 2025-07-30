import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store, { persistor } from "./utils/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Requests from "./pages/requests/Requests.jsx";
import Profile from "./pages/profile/Profile.jsx";
import FeedCard from "./components/FeedCard.jsx";
import Connections from "./pages/connections/Connections.jsx";
import boyImage from "./assets/dhanya.jpg";

const profiles = [
  {
    name: "Ritika Sharma",
    age: 23,
    job: "Frontend Dev",
    distance: 5,
    image: "https://i.pravatar.cc/400?img=1",
  },
  {
    name: "Aman Verma",
    age: 25,
    job: "Backend Dev",
    distance: 12,
    image: "https://i.pravatar.cc/400?img=2",
  },
  {
    name: "Sanya Kapoor",
    age: 22,
    job: "UI Designer",
    distance: 8,
    image: "https://i.pravatar.cc/400?img=3",
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: (
          <FeedCard profiles={profiles} showActions={true} showLabels={true} />
        ),
      },
      {
        path: "requests",
        element: <Requests />,
      },
      {
        path: "connections",
        element: <Connections />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
