import { axiosInstance } from "../utils/axiosInstance";

export const signup = async (data: { email: string; password: string }) => {
    try {
        return await axiosInstance.post("/signup", data);
    } catch (error: any) {
        throw error.response?.data?.message || "Signup failed. Please try again.";
    }
};

export const signin = async (data: { email: string; password: string }) => {
    try {
        return await axiosInstance.post("/signin", data);
    } catch (error: any) {
        throw error.response?.data?.message || "Login failed. Please try again.";
    }
};
