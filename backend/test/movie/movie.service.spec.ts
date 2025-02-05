// @ts-nocheck
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../../src/movie/movie.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateMovieDto } from '../../src/movie/dto/movie.dto';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';

describe('MovieService', () => {
    let movieService: MovieService;
    let prismaService: jest.Mocked<PrismaService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MovieService,
                {
                    provide: PrismaService,
                    useValue: {
                        movie: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            count: jest.fn(),
                            delete: jest.fn(),
                            findUnique: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        movieService = module.get<MovieService>(MovieService);
        prismaService = module.get<PrismaService>(PrismaService) as jest.Mocked<PrismaService>;
    });

    it('should be defined', () => {
        expect(movieService).toBeDefined();
    });

    describe('addMovie', () => {
        it('should add a movie for the user', async () => {
            const createMovieDto: CreateMovieDto = { title: 'Inception' };
            const userId = 1;
            const movie = { id: 1, title: 'Inception', userId };

            prismaService.movie.create.mockResolvedValue(movie);

            const result = await movieService.addMovie(userId, createMovieDto);

            expect(prismaService.movie.create).toHaveBeenCalledWith({
                data: { title: 'Inception', userId },
            });
            expect(result).toEqual(movie);
        });

        it('should throw an error if movie already exists', async () => {
            const createMovieDto: CreateMovieDto = { title: 'Inception' };
            const userId = 1;

            prismaService.movie.create.mockRejectedValue({ code: 'P2002' });

            await expect(movieService.addMovie(userId, createMovieDto)).rejects.toThrow(BadRequestException);
        });
    });

    describe('getMovies', () => {
        it('should get movies with pagination and search', async () => {
            const userId = 1;
            const page = 1;
            const limit = 10;
            const search = "Inception";
            const movies = [
                { id: 1, title: 'Inception', userId, createdAt: new Date() },
            ];

            prismaService.movie.findMany.mockResolvedValue(movies);
            prismaService.movie.count.mockResolvedValue(1);

            const result = await movieService.getMovies(userId, page, limit, search);

            expect(prismaService.movie.findMany).toHaveBeenCalledWith({
                where: { userId, title: { contains: search } },
                orderBy: { createdAt: 'desc' },
                take: limit,
                skip: (page - 1) * limit,
                select: { id: true, title: true },
            });
            expect(result).toEqual({ movies, totalPages: 1, currentPage: page });
        });

        it('should return an empty list if no movies are found', async () => {
            prismaService.movie.findMany.mockResolvedValue([]);
            prismaService.movie.count.mockResolvedValue(0);

            const result = await movieService.getMovies(1, 1, 10, "");

            expect(result.movies).toEqual([]);
            expect(result.totalPages).toBe(0);
        });
    });

    describe('deleteMovie', () => {
        it('should delete a movie if it belongs to the user', async () => {
            const userId = 1;
            const movieId = 1;
            const movie = { id: movieId, title: 'Inception', userId };

            prismaService.movie.findUnique.mockResolvedValue(movie);
            prismaService.movie.delete.mockResolvedValue(movie);

            const result = await movieService.deleteMovie(userId, movieId);

            expect(prismaService.movie.findUnique).toHaveBeenCalledWith({
                where: { id: movieId },
            });

            expect(prismaService.movie.delete).toHaveBeenCalledWith({
                where: { id: movieId },
            });

            expect(result).toEqual(movie);
        });

        it('should throw NotFoundException if movie does not exist', async () => {
            prismaService.movie.findUnique.mockResolvedValue(null);

            await expect(movieService.deleteMovie(1, 99)).rejects.toThrow(NotFoundException);
        });

        it('should throw ForbiddenException if user does not own the movie', async () => {
            prismaService.movie.findUnique.mockResolvedValue({ id: 1, title: 'Inception', userId: 2 });

            await expect(movieService.deleteMovie(1, 1)).rejects.toThrow(ForbiddenException);
        });
    });
});
