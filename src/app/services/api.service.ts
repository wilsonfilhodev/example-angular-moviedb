import { Genre } from './../models/genre';
import { Movie } from './../models/movie';
import { Utils } from './../models/utils';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  mapGenres = new Map();

  urlSearch = `${Utils.apiURL}search/movie?api_key=${Utils.apiKey}&sort_by=original_title.asc&language=pt-BR`;
  urlSearchByGenre = `${Utils.apiURL}discover/movie?api_key=${Utils.apiKey}&sort_by=original_title.asc&language=pt-BR&with_genres=`;
  urlPopular = `${Utils.apiURL}movie/popular?api_key=${Utils.apiKey}&language=pt-BR`;
  urlGenres = `${Utils.apiURL}genre/movie/list?api_key=${Utils.apiKey}&language=pt-BR`;

  constructor(private httpClient: HttpClient) {
    this.setGenres();
   }

  async getMovieById(id: number) {
    try {
      const res = await this.httpClient.get<any>(`${Utils.apiURL}movie/${id}?api_key=${Utils.apiKey}&language=pt-BR`).toPromise();
      return res || {};
    } catch (error) {
      return console.log('ERROR: ', error);
    }
  }

  async getGenres() {
    try {
      const res = await this.httpClient.get<any>(this.urlGenres).toPromise();
      return res || {};
    } catch (error) {
      return console.log('ERROR: ', error);
    }
  }

  async getPopularMovies(page: number) {
    try {
      const res = await this.httpClient.get<any>(`${this.urlPopular}&page=${page}`).toPromise();
      return res || {};
    } catch (error) {
      return console.log('ERROR: ', error);
    }
  }

  async getTrailer(id: number) {
    try {
      const res = await this.httpClient.get<any>(`${Utils.apiURL}movie/${id}/videos?api_key=${Utils.apiKey}&language=pt-BR`).toPromise();
      return res || {};
    } catch (error) {
      return console.log('ERROR: ', error);
    }
  }

  async getMoviesByGenre(id: number) {
    try {
      const res = await this.httpClient.get<any>(`${this.urlSearchByGenre}${id}`).toPromise();
      return res || {};
    } catch (error) {
      return console.log('ERROR: ', error);
    }
  }

  searchMovies(query: string, page: number): Observable<Movie[]> {
    if (query.trim() === '') {
      return this.getPopularMoviesObservable(page);
    } else {
      const genre = this.isGenre(query);
      if (genre) { return this.findMovieByGenreSearch(genre); }
      if (!genre) { return this.findMovieByTermSearch(query, page); }
    }
  }

  private async setGenres() {
    const responseGenres = await this.getGenres();
    this.mapGenres = new Map(responseGenres.genres.map((genre: any) => [genre.id, genre.name]));
  }

  private isGenre(query: any) {
    let keyGenre = null;
    this.mapGenres.forEach((value: string, key: number) => {
      if (value.toLowerCase() === query) {
        keyGenre = key;
      }
    });
    return keyGenre;
  }

  private isYear(query: any) {
    return Number(query.trim()) || null;
  }

  private getPopularMoviesObservable(page: number) {
    return this.httpClient.get<any>(`${this.urlPopular}&page=${page}`).pipe(map((response: any) => {
      return response.results.map((item: any) => {
        return this.parseResponseToMovie(item);
      });
    }));
  }

  private findMovieByGenreSearch(id: number) {
    return this.httpClient.get<any>(`${this.urlSearchByGenre}${id}`).pipe(map((response: any) => {
      return response.results.map((item: any) => {
        return this.parseResponseToMovie(item) ;
      });
    }));
  }

  private findMovieByTermSearch(query: string, page: number) {
    return this.httpClient.get(`${this.urlSearch}&query=${query}&page=${page}`).pipe(map((response: any) => {
      return response.results.map((item: any) => {
        return this.parseResponseToMovie(item);
      });
    }));
  }

  private parseResponseToMovie(res: any) {
    return {
      id: res.id,
      title: res.title,
      voteAverage: res.vote_average / 10,
      releaseDate: res.release_date,
      overview: res.overview,
      posterPath: res.poster_path ? `${Utils.baseUrlPoster600w}${res.poster_path}` : 'assets/img/no-poster.jpg',
      genres: this.getGenresThisMovie(res)
    };
  }

  private getGenresThisMovie(movie: any): Genre[] {
    return movie.genre_ids.map( (id: number) => (
      { id, name: this.mapGenres.get(id) }
    ));
  }
}
