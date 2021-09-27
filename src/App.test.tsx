import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Pokemon App", async () => {
  render(<App />);
  const appName = await screen.findByText(/pokemon app/gi);
  expect(appName).toBeInTheDocument();
});

test("renders 20 first pokemons", async () => {
  render(<App />);
  expect(await screen.findAllByTestId("pokemon-card")).toHaveLength(20);
});
