import { Genre } from './../../../models/genre';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { Utils } from './../../../models/utils';
import { Movie } from './../../../models/movie';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  public loading: boolean;
  public movies = new Array<Movie>();
  private mapGenres = new Map();
  public page = 1;

  constructor(
    private apiService: ApiService,
    private router: Router
    ) { }

  ngOnInit() {
    this.initialize();
  }

  goToMovie(id: number) {
    this.router.navigate(['/movie', id]);
  }

  async selectGenre(id: number) {
    const result = await this.apiService.getMoviesByGenre(id);
    this.movies = this.parseResponseToMovie(result);
    this.toUp();
  }

  updateResults(event: any) {
    this.movies = event;
    this.page = 1;
  }

  pageChange(page: number) {
    this.page = page;
    this.toUp();
  }

  private async initialize() {
    const responseGenres = await this.apiService.getGenres();
    this.mapGenres = new Map(responseGenres.genres.map((genre: any) => [genre.id, genre.name]));
    const responseMovies = await this.apiService.getPopularMovies(1);
    this.movies = this.parseResponseToMovie(responseMovies);
  }

  private parseResponseToMovie(res: any): Movie[] {
    return res.results.map( (movie: any) => (
      {
        id: movie.id,
        title: movie.title,
        voteAverage: movie.vote_average / 10,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: movie.poster_path ? `${Utils.baseUrlPoster600w}${movie.poster_path}` : 'assets/img/no-poster.jpg',
        genres: this.getGenresThisMovie(movie)
      }));
    }

  private getGenresThisMovie(movie: any): Genre[] {
  return movie.genre_ids.map( (id: number) => (
    { id, name: this.mapGenres.get(id) }
    ));
  }

  private toUp() {
    window.scroll(0, 0);
  }
}
