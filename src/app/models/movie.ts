import { Genre } from './genre';

export class Movie {
  id: string;
  title: string;
  voteAverage: number;
  releaseDate: string;
  overview: string;
  genres = new Array<Genre>();
}
