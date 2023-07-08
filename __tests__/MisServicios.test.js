import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react'
import MisServicios from "../pages/main/MisServicios";

describe("MisServicios", () => {
    it("should show 'Mis Servicios' title", async () => {
        const textToFind = "Mis Servicios"
    
        render(<MisServicios />);
        const heading = screen.getByRole('heading', { name: textToFind });

        await waitFor(() => {
            expect(heading).toBeInTheDocument();
            });
    });

    // it("should show 'Mis Servicios' description", async () => {
    //     const textToFind = "En esta sección podrás administrar la información acerca de los servivios que ofreciste y fueron contratados por un tercero"
    
    //     render(<MisServicios />);
    //     const heading = screen.getByText(textToFind);

    //     await waitFor(() => {
    //         expect(heading).toBeInTheDocument();
    //     });
    // });
});


