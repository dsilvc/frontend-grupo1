import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react'
import Home from "../pages/user/editProfile";

describe("editProfile", () => {
    it("should show 'Editar perfil' title", async () => {
    const textToFind = "Editar perfil"

    render(<Home />);
    const heading = screen.getByRole('heading', { name: textToFind });

    await waitFor(() => {
        expect(heading).toBeInTheDocument();
    });
    });
});

