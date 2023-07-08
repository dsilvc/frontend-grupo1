import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react'
import NewPassword from "../pages/session/newPassword";

describe("NewPassword",  () => {
    it("should render title", async () => {
      const textToFind = "Nueva contraseña"
  
      render(<NewPassword />);
      const heading = screen.getByText(textToFind);
        
      await waitFor(() => {
      expect(heading).toBeInTheDocument();
      });
    });
});