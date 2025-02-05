import { axiosInstance } from "../utils/axiosInstance";

// Fetch movies with pagination & search
export const fetchMovies = async ({ page = 1, search = "" }) => {
    const response = await axiosInstance.get(`/movies?page=${page}&limit=10&search=${encodeURIComponent(search)}`);
    return response.data;
};

export const addMovie = async (title: string) => {
    return axiosInstance.post("/movies", { title });
};

export const deleteMovie = async (movieId: number) => {
    return axiosInstance.delete(`/movies/${movieId}`);
};