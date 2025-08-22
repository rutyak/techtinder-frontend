import { render, screen } from "@testing-library/react";
import Herosection from "../Herosection";

describe("Herosection", () => {
  const renderComponent = () => {
    return render(<Herosection />);
  };

  it("render herosection component", () => {
    renderComponent();
    expect(screen.getByText(/Match. Connect. Hired./i)).toBeInTheDocument();
    expect(
      screen.getByText(/Where Tech Talent Meets Perfect Opportunitie/i)
    ).toBeInTheDocument();
  });
});
