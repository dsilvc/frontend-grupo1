import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react'
import Home from "../pages/user/profile";

describe("Profile", () => {
    it("should show 'Mi perfil' title", async () => {
        const textToFind = "Mi perfil"
    
        render(<Home />);
        const heading = screen.getByRole('heading', { name: textToFind });

        await waitFor(() => {
            expect(heading).toBeInTheDocument();
        });
    });
    });
