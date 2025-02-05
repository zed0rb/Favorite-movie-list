import {Body, Controller, Delete, Get, Post, Query, Request, UseGuards, Param, ParseIntPipe} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/movie.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('api/movies')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async addMovie(
        @Request() req: { user: { id: number } },
        @Body() createMovieDto: CreateMovieDto
    ) {
        return await this.movieService.addMovie(req.user.id, createMovieDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getMovies(
        @Request() req: { user: { id: number } },
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10,
        @Query('search') search: string = ""
    ) {
        return this.movieService.getMovies(req.user.id, page, limit, search);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteMovie(
        @Request() req: { user: { id: number } },
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.movieService.deleteMovie(req.user.id, id);
    }
}
