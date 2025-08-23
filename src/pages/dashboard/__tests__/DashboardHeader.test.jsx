import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import DashboardHeader from "../DashboardHeader";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import configureStore from 'redux-mock-store'

const mockStore = configureStore([]);

describe("DashboardHeader", () => {
  let store;
  const user = userEvent.setup();

  beforeEach(() => {
    store = mockStore({
      user: {
        firstname: "Narendra",
        lastname: "Modi",
      },
      requests: [{ id: 1 }, { id: 2 }, { id: 3 }],
    });
  });
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <DashboardHeader />
        </BrowserRouter>
      </Provider>
    );
  };

  it("render dashboardheader component", () => {
    renderComponent();
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Narendra")).toBeInTheDocument();
  });

  it("display correct request count badge", () => {
    renderComponent();
    expectq(screen.getByText("3")).toBeInTheDocument();
  });

  it("toggle dropdown menu on user area click", async () => {
    renderComponent();
    const userArea = screen.getByText("Welcome");
    await user.click(userArea);

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
