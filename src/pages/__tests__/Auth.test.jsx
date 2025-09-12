import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Auth from "../Auth";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

vi.mock("axios");

describe("Auth component", () => {
  const user = userEvent.setup();

  const createStore = (preloadedState) => {
    return configureStore({
      reducer: {
        user: (state = {}) => state,
      },
      preloadedState,
    });
  };

  const renderComponent = (preloadedState = {}) => {
    const store = createStore(preloadedState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <Auth />
        </BrowserRouter>
      </Provider>
    );
  };

  it("render login page", async () => {
    axios.post.mockResolvedValue({ data: { message: "Login successfull" } });

    renderComponent();

    // Open login modal
    const Btn = screen.getByRole("button", { name: /login/i });
    await user.click(Btn);
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();    
  });

  it("redner forget-password page", async () => {
    renderComponent();

    const loginBtn = screen.getByRole("button", { name: /login/i });
    await user.click(loginBtn);

    const forgetBtn = screen.getByText("Forget Password?");
    await user.click(forgetBtn);

    expect(screen.getByText("Forgot Password 🔑")).toBeInTheDocument();
  });

  it("render signup page", async () => {
    renderComponent();

    const loginBtn = screen.getByRole("button", { name: /login/i });
    await user.click(loginBtn);

    const signupBtn = screen.getByText("Signup");
    await user.click(signupBtn);

    expect(screen.getByText("Connect with us 🤝")).toBeInTheDocument();
  });
});
