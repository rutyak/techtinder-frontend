import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import FeedCards from "../FeedCards";
import { Provider } from "react-redux";
import store from "../../../utils/store";

describe("FeedCards", () => {
  function renderComponent() {
    return render(
      <Provider store={store}>
        <FeedCards />
      </Provider>
    );
  }

  it("render feedcards component", () => {
    renderComponent();

    expect(screen.getByTestId("feedcard")).toBeInTheDocument();
  });
});
