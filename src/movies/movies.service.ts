import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find(movie=> movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`)
    } else {
      return movie;
    }
  }

  deleteOne(id: number): number {
    this.getOne(id)
    this.movies = this.movies.filter(movie=> movie.id !== id);
    return id;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    })
    return this.movies;
  }

  update(id: number, updateData: UpdateMovieDto) {
    this.getOne(id)
    this.movies = this.movies.map(movie=> movie.id === id ? { ...movie, ...updateData } : movie);
    return updateData
  }
}
