import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addMovie } from "../../api/movies";
import { Form, Button, InputGroup, Alert, Spinner } from "react-bootstrap";
import { useQueryClient } from "react-query";
import { useState } from "react";

type MovieFormValues = {
    title: string;
};

const schema = z.object({
    title: z.string().min(1, "Movie title is required"),
});

export const AddMovie = () => {
    const { register, handleSubmit, reset } = useForm<MovieFormValues>({
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<MovieFormValues> = async (data) => {
        setError("");
        setIsLoading(true);

        try {
            await addMovie(data.title);
            reset();
            await queryClient.invalidateQueries("movies");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add movie.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
            <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                <InputGroup>
                    <Form.Control {...register("title")} placeholder="Enter movie title" disabled={isLoading} />
                    <Button type="submit" variant="primary" disabled={isLoading}>
                        {isLoading ? <Spinner size="sm" animation="border" /> : "Add"}
                    </Button>
                </InputGroup>
            </Form>
        </>
    );
};
