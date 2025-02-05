import { ListGroup } from "react-bootstrap";
import { DeleteMovieButton } from "./DeleteMovieButton";

interface MovieListProps {
    movies: { id: number; title: string }[];
}

export const MovieList = ({ movies }: MovieListProps) => {
    return (
        <ListGroup className="mt-3">
            {movies.map((movie) => (
                <ListGroup.Item
                    key={movie.id}
                    className="d-flex justify-content-between align-items-center"
                >
                    {movie.title}
                    <DeleteMovieButton movieId={movie.id} />
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};
