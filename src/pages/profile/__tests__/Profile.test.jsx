import Profile from "../Profile";
import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";

describe("Profile", () => {
  const user = userEvent.setup();
  const mockUser = {
    _id: 123,
    firstname: "Jon",
    lastname: "Singh",
    job: "MERN stack developer",
    gender: "male",
    age: 24,
    skills: ["HTML", "CSS", "JS"],
  };

  const store = () => {
    return configureStore({
      reducer: {
        user: (state = {}) => state,
      },
      preloadedState: {
        user: mockUser,
      },
    });
  };

  const renderComponent = () => {
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

  it("render profile edit", async () => {
    renderComponent();

    const editBtn = screen.getByRole("button", { name: /Edit/i });

    await user.click(editBtn);

    expect(screen.getByDisplayValue("Jon")).toBeInTheDocument();
  });
});
