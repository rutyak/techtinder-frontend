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
import Connections from "./pages/connections/Connections.jsx";
import boyImage from "./assets/dhanya.jpg";
import FeedCards from "./components/FeedCard/FeedCards.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";

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
        element: <FeedCards />,
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
        <GlobalProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </GlobalProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
