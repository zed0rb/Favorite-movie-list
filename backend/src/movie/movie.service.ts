import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async addMovie(userId: number, dto: CreateMovieDto) {
    const { title } = dto;

    try {
      return await this.prisma.movie.create({
        data: { title, userId },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Movie already exists.');
      }
      throw error;
    }
  }

  async getMovies(
    userId: number,
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ) {
    const offset = (page - 1) * limit;

    const searchFilter = search ? { title: { contains: search } } : {};

    const whereCondition = { userId, ...searchFilter };

    const movies = await this.prisma.movie.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      select: { id: true, title: true },
    });

    const totalMovies = await this.prisma.movie.count({
      where: whereCondition,
    });

    return {
      movies,
      totalPages: Math.ceil(totalMovies / limit),
      currentPage: page,
    };
  }

  async deleteMovie(userId: number, movieId: number) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found.');
    }

    if (movie.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this movie.');
    }

    return this.prisma.movie.delete({
      where: { id: movieId },
    });
  }
}
