import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from '@testing-library/react'
import Home from "../pages/index";
import { Button } from "antd";

describe("LandingPage",  () => {
    it("should render UC", async () => {
      const textToFind = "UC"
  
      render(<Home />);
      const heading = screen.getByText(textToFind);
        
      await waitFor(() => {
      expect(heading).toBeInTheDocument();
      });
    });

    it("should render page name", async () => {
      const textToFind = "Páginas Celestes"
  
      render(<Home />);
      const heading = screen.getByText(textToFind);

      await waitFor(() => {
        expect(heading).toBeInTheDocument();
        });
    });

    it("should render landing page description", async () => {
      const textToFind = "Una comunidad segura donde puedes buscar y ofrecer ayuda a sólo un click"
  
      render(<Home />);
      const heading = screen.getByText(textToFind);

      await waitFor(() => {
        expect(heading).toBeInTheDocument();
        });
    });

    it("should have 'Iniciar Sesión' button", async () => {
  
      render(<Home />);
      render(<Button/>);

      const button = screen.getByRole('button', { name: 'Iniciar Sesión' });

      await waitFor(() => {
        expect(button).toBeInTheDocument();
        });
    });

    it("should have 'Saber más' button", async () => {
  
      render(<Home />);
      render(<Button/>);

      const button = screen.getByRole('button', { name: 'Saber más' });

      await waitFor(() => {
        expect(button).toBeInTheDocument();
        });
    });
  });