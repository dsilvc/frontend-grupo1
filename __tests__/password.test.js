import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react'
import Password from "../pages/session/password";

describe("Change Password",  () => {
    it("should render title", async () => {
      const textToFind = "Restauración de contraseña"
  
      render(<Password />);
      const heading = screen.getByText(textToFind);
        
      await waitFor(() => {
      expect(heading).toBeInTheDocument();
      });
    });
});