import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders Pokemon App", async () => {
  render(<App />);
  const appName = await screen.findByText(/pokemon app/gi);
  expect(appName).toBeInTheDocument();
});

test("renders 20 first pokemons", async () => {
  render(<App />);
  expect(await screen.findAllByTestId("pokemon-card")).toHaveLength(20);
});

test("render search results", async () => {
  render(<App />);
  let searchField = await screen.findByTestId("search-field");
  const searchButton = await screen.findByTestId("search-button");
  fireEvent.change(searchField, { target: { value: "mega" } });
  userEvent.click(searchButton);
  expect(await screen.findByText("gengar-mega")).toBeInTheDocument();
});

test("render search results when there are no matches", async () => {
  render(<App />);
  let searchField = await screen.findByTestId("search-field");
  const searchButton = await screen.findByTestId("search-button");
  fireEvent.change(searchField, { target: { value: "xxx" } });
  userEvent.click(searchButton);
  expect(
    await screen.findByText("There are no pokemons matching your serch")
  ).toBeInTheDocument();
});
