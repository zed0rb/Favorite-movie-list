import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Movies } from "./pages/Movies";
import { NotFound } from "./pages/NotFound";
import { AppNavbar } from "./components/Navbar";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);
    return auth?.token ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppNavbar />
                    <Container fluid className="min-vh-100 p-4 bg-primary">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Container>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    );
};

export default App;
