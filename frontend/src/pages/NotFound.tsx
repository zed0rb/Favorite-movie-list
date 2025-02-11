import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <Container className="text-center vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1 className="display-3">404</h1>
            <h2>Oops! Page Not Found</h2>
            <p className="text-muted">The page you are looking for doesn't exist.</p>
            <Link to="/">
                <Button variant="primary">Go to Home</Button>
            </Link>
        </Container>
    );
};
