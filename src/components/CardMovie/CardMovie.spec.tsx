import React from "react";
import { render, screen } from "@testing-library/react";
import CardMovie from ".";

const mockMovie = {
  title: "Title Test",
  id: 1,
  overview: "Test overview",
  releaseDate: "2023-10-19",
  posterPath: "/sample-poster.jpg",
  handleClickDetails: jest.fn(),
  handleAddFavorite: jest.fn(),
  listFavoritedMovies: [],
};

describe(`<CardMovie>`, () => {
  it("renders correctly CardMovie component", () => {
    render(<CardMovie {...mockMovie}>Test Grid</CardMovie>);
    const titleElement = screen.getByText("Title Test");
    expect(titleElement).toBeInTheDocument();
  });
});
