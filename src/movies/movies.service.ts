import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find(movie=> movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`)
    } else {
      return movie;
    }
  }

  deleteOne(id: string): string {
    this.getOne(id)
    this.movies = this.movies.filter(movie=> movie.id !== +id);
    return id;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData
    })
    return this.movies;
  }

  update(id: string, updateData) {
    this.getOne(id)
    this.movies = this.movies.map(movie=> movie.id === +id ? { ...movie, updateData } : movie);
    return updateData
  }
}
