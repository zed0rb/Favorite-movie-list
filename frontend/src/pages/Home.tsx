import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

export const Home = () => {
    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center text-white">
            <Row>
                <Col className="text-center">
                    <h1 className="fw-bold">🎬 Welcome to Movie List</h1>
                    <p className="lead">Save and manage your favorite movies effortlessly.</p>
                    <div className="mt-4">
                        <Link to="/login">
                            <Button variant="light" className="me-3">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="outline-light">Signup</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
