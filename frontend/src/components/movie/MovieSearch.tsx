import { Form } from "react-bootstrap";

interface MovieSearchProps {
    search: string;
    setSearch: (value: string) => void;
}

export const MovieSearch = ({ search, setSearch }: MovieSearchProps) => {
    return (
        <Form.Control
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3"
        />
    );
};
