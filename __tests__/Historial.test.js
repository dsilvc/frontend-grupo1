import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react'
import Historial from "../pages/main/Historial";

describe("Historial", () => {
    it("should show 'Historial' title", async () => {
        const textToFind = "Historial"
    
        render(<Historial />);
        const heading = screen.getByRole('heading', { name: textToFind });

        await waitFor(() => {
            expect(heading).toBeInTheDocument();
         });
    });
    });
