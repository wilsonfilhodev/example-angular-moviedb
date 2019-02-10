import { Utils } from './../models/utils';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlSearch = `${Utils.apiURL}search/movie?api_key=${Utils.apiKey}&language=pt-BR`;
  urlPopular = `${Utils.apiURL}movie/popular?api_key=${Utils.apiKey}&language=pt-BR`;
  urlGenres = `${Utils.apiURL}genre/movie/list?api_key=${Utils.apiKey}&language=pt-BR`;

  constructor(private httpClient: HttpClient) { }

  public getMovies(query: string, page: number) {
    return this.httpClient.get<any[]>(`${this.urlSearch}&query=${query}&page=${page}`);
  }

  public getGenres() {
    return this.httpClient.get<any[]>(`${this.urlGenres}`);
  }

  public getPopularMovies(page: number) {
    return this.httpClient.get<any[]>(`${this.urlPopular}&page=${page}`);
  }
}
