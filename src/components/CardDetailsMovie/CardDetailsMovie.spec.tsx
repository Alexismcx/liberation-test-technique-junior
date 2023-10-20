import { fireEvent, render, screen } from "@testing-library/react";
import CardDetailsMovie from ".";

const mockMovie = {
  title: "Title Detail",
  id: 1,
  overview: "Test overview",
  releaseDate: "2023-10-19",
  posterPath: "/test-poster.jpg",
  handleClickDetails: jest.fn(),
  handleAddFavorite: jest.fn(),
  handleChangeRating: jest.fn(),
  listRatedMovies: [],
  listFavoritedMovies: [],
};

describe(`<CardDetailsMovie>`, () => {
  beforeEach(() => {
    render(<CardDetailsMovie {...mockMovie} />);
  });
  it("renders correctly CardMovie component", () => {
    const titleElement = screen.getByText("Title Detail");
    expect(titleElement).toBeTruthy();
  });
  it("should handles rating change", () => {
    const ratingComponent = screen.getByTestId("rating-star");
    fireEvent.change(ratingComponent, {
      target: { value: 3 },
    });
    expect(mockMovie.handleChangeRating).toHaveBeenCalledWith(3, 1);
  });
  it("should match the snapshot", () => {
    const titleElement = screen.getByText("Title Detail");
    expect(titleElement).toMatchSnapshot();
  });
});
