import { Pagination } from "react-bootstrap";

interface MoviePaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
}

export const MoviePagination = ({ page, totalPages, setPage }: MoviePaginationProps) => {
    return (
        <Pagination className="justify-content-center mt-3">
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page >= totalPages} />
        </Pagination>
    );
};
