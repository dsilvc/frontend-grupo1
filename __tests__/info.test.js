import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react'
import LandingPage from "../pages/info";

  describe("InfoPage", () => {
    it("should render UC", async () => {
      const textToFind = "UC"
  
      render(<LandingPage />);
      const heading = screen.getByText(textToFind);

      await waitFor(() => {
        expect(heading).toBeInTheDocument();
      });
    });

    it("should render page name", async () => {
        const textToFind = "Páginas Celestes"
    
        render(<LandingPage />);
        const heading = screen.getByText(textToFind);

        await waitFor(() => {
            expect(heading).toBeInTheDocument();
        });
    });

    it("should render landing page description p1 ", async () => {
    const textToFind = "¿Cansado de buscar clases particulares y no encontrar?"

        render(<LandingPage />);
        const heading = screen.getByText(textToFind);

        await waitFor(() => {
            expect(heading).toBeInTheDocument();
        });
    });

    it("should render landing page description p2", async () => {
        const textToFind = "En páginas celestes encontrarás la oferta más grande de clases particulares para ayudarte a pasar tus ramos de la mejor manera. Navegando por la página podrás encontrar profesores de las asignaturas que necesitas junto con sus valoraciones, para que puedas elegir el que más te acomode."
    
        render(<LandingPage />);
        const heading = screen.getByText(textToFind);

        await waitFor(() => {
            expect(heading).toBeInTheDocument();
        });
    });

    it("should render landing page description p3", async () => {
        const textToFind = "¿Qué esperas para ingresar y ser parte de la comunidad de clases particulares más grande de la UC?"
    
        render(<LandingPage />);
        const heading = screen.getByText(textToFind);

        await waitFor(() => {
            expect(heading).toBeInTheDocument();
        });
      });
  });