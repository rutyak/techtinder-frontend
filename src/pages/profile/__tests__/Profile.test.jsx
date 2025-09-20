import Profile from "../Profile";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

describe("Profile", () => {
  const mockUser = {
    _id: 123,
    firstname: "Jon",
    lastname: "Singh",
    job: "MERN stack developer",
    gender: "male",
    age: 24,
    skills: ["HTML", "CSS", "JS"],
  };

  const createStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        user: (state = {}) => state,
      },
      preloadedState: preloadedState,
    });
  };

  const renderComponent = () => {
    const store = createStore(mockUser);

    return render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  };

  it("render profile component", () => {
    renderComponent();

    expect(screen.getByText("My Profile")).toBeInTheDocument();
  });
});
