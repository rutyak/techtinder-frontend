// import { render, screen } from "@testing-library/react";
// import ChangePassword from "../ChangePassword";
// import axios from "axios";
// import userEvent from "@testing-library/user-event";
// import { ToastContainer } from "react-toastify";

// vi.mock("axios");

// describe("ChangePassword", () => {
//   const user = userEvent.setup();

//   function renderComponent() {
//     return render(
//       <>
//         <ToastContainer />
//         <ChangePassword />
//       </>
//     );
//   }

//   it("render change-password component", async () => {
//     axios.post.mockResolvedValue({
//       data: { message: "Password changed successfully" },
//       status: 200,
//     });

//     renderComponent();

//     const changePasswordBtn = screen.getByText("Change");
//     await user.click(changePasswordBtn);

//     await user.type(
//       screen.getByPlaceholderText("Enter old password"),
//       "Test@123"
//     );
//     await user.type(screen.getByPlaceholderText("New password"), "NewTest@123");
//     await user.type(
//       screen.getByPlaceholderText("Confirm password"),
//       "NewTest@123"
//     );

//     const saveBtn = screen.getByRole("button", { name: /Save Password/i });
//     await user.click(saveBtn);

//     expect(
//       screen.getByText("Password changed successfully")
//     ).toBeInTheDocument();
//   });
// });
