import { render, screen } from "@testing-library/react";
import Premium from "../Premium";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../utils/userSlice";
import userEvent from "@testing-library/user-event";
import axios from "axios";

global.Razorpay = vi.fn().mockImplementation(() => ({
  open: vi.fn(),
}));

vi.mock("axios");

describe("Premium", () => {
  const user = userEvent.setup();

  const createStore = (preloadedState) => {
    return configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: { user: preloadedState },
    });
  };

  function renderComponent(preloadedState) {
    const store = createStore(preloadedState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Premium />
        </BrowserRouter>
      </Provider>
    );
  }

  it("render premium component", () => {
    renderComponent({ isPremium: false });

    expect(screen.getByText("Go Premium")).toBeInTheDocument();
  });

  it("already subscribed user page", () => {
    renderComponent({ isPremium: true });

    expect(screen.getByText("You are a Premium Member!")).toBeInTheDocument();
  });

//   it("subscribe now button click", async () => {
//     const res = {
//       data: {
//         payment: {
//           keyId: "test_key",
//           amount: 1000,
//           currency: "INR",
//           orderId: "123",
//           notes: { name: "John" },
//         },
//       },
//     };
//     axios.post.mockResolvedValue({ data: { payment: res } });

//     renderComponent({ isPremium: false });

//     const subscribeBtn = screen.getByRole("button", { name: /Subscribe Now/i });
//     await user.click(subscribeBtn);

//     await handleSubscribeClick("Gold");
//   });
});
