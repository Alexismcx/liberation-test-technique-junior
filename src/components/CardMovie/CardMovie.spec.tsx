import { fireEvent, render, screen } from "@testing-library/react";
import CardMovie from ".";

const mockMovie = {
  title: "Title Test",
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

describe(`<CardMovie>`, () => {
  beforeEach(() => {
    render(<CardMovie {...mockMovie} />);
  });
  it("renders correctly CardMovie component", () => {
    const titleElement = screen.getByText("Title Test");
    expect(titleElement).toBeTruthy();
  });
  it('sould handles "Add to Favorites" button click', () => {
    fireEvent.click(screen.getByTestId("button-favorite"));
    expect(mockMovie.handleAddFavorite).toHaveBeenCalledWith(
      1,
      "Title Test",
      "/test-poster.jpg"
    );
  });
  it("should handles rating change", () => {
    const ratingComponent = screen.getByTestId("rating-star");
    fireEvent.change(ratingComponent, {
      target: { value: 3 },
    });
    expect(mockMovie.handleChangeRating).toHaveBeenCalledWith(3, 1);
  });
  it("should match the snapshot", () => {
    const titleElement = screen.getByText("Title Test");
    expect(titleElement).toMatchSnapshot();
  });
});
