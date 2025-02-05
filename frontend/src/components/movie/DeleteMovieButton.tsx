import { Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { deleteMovie } from "../../api/movies";

interface DeleteMovieButtonProps {
    movieId: number;
}

export const DeleteMovieButton = ({ movieId }: DeleteMovieButtonProps) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(() => deleteMovie(movieId), {
        onSuccess: () => {
            queryClient.invalidateQueries(["movies"]); // ✅ Refresh movies list after delete
        },
    });

    return (
        <Button
            variant="danger"
            size="sm"
            onClick={() => mutate()}
            disabled={isLoading}
        >
            {isLoading ? "Deleting..." : "🗑️ Delete"}
        </Button>
    );
};
