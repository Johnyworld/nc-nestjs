import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const movies = service.getAll();
      expect(movies).toBeInstanceOf(Array);
    });
  })
  
  describe('getOne', () => {
    it('should return a movie ', () => {
      service.create({
        title: 'TestMovie',
        genres: ['test'],
        year: 2020,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999)
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['text'],
        year: 2020,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['text'],
        year: 2020,
      }); 
      service.update(1, {
        title: 'Updated Test'
      });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {})
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    })
  });
  
  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['text'],
        year: 2020,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
      // service.deleteOne();
    })
    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999)
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    })
  });

});