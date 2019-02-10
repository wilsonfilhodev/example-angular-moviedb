import { Genre } from './genre';

export class Movie {
  id: number;
  title: string;
  voteAverage: number;
  releaseDate: string;
  overview: string;
  genres = new Array<Genre>();
  status: string;
  language: string;
  runtime: number;
  video = false;
  budget: number;
  revenue: number;
  profet: number;
  trailer: string;
}
