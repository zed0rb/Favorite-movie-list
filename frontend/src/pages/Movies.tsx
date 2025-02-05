import { useQuery } from "react-query";
import { fetchMovies } from "../api/movies";
import { AddMovie } from "../components/movie/AddMovie.tsx";
import { MovieList } from "../components/movie/MovieList";
import { MovieSearch } from "../components/movie/MovieSearch";
import { MoviePagination } from "../components/movie/MoviePagination";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

export const Movies = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Debounce search input (prevents excessive API calls)
    const debouncedSetSearch = useCallback(debounce(setDebouncedSearch, 500), []);

    useEffect(() => {
        debouncedSetSearch(search);
        setPage(1);
    }, [search, debouncedSetSearch]);

    // Fetch movies (updates when page or search changes)
    const { data, isLoading, error } = useQuery(
        ["movies", page, debouncedSearch],
        () => fetchMovies({ page, search: debouncedSearch }),
        { keepPreviousData: true, refetchOnWindowFocus: false }
    );

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-4">
                        <Card.Body>
                            <h2 className="text-center mb-4">🎬 Your Movies</h2>

                            <AddMovie />

                            <MovieSearch search={search} setSearch={setSearch} />

                            {isLoading && (
                                <div className="text-center mt-3">
                                    <Spinner animation="border" variant="primary" />
                                </div>
                            )}

                            {error instanceof Error && (
                                <Alert variant="danger" className="mt-3">
                                    {error.message || "Error loading movies. Please try again."}
                                </Alert>
                            )}

                            {data?.movies?.length > 0 ? (
                                <>
                                    <MovieList movies={data.movies} />
                                    <MoviePagination page={page} totalPages={data.totalPages} setPage={setPage} />
                                </>
                            ) : (
                                <p className="text-muted text-center mt-3">No favorite films for now.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
