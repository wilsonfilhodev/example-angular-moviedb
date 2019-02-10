import { Genre } from './../../../models/genre';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { Utils } from './../../../models/utils';
import { Movie } from './../../../models/movie';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  public p = 1;
  public movies = new Array<Movie>();
  public searchInput: string;
  private mapGenres = new Map();

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

  selectGenre(event: Event) {
    console.log('Called select genre...' , event);
  }

  private searchMovie(query: string, page: number) {
    this.apiService.getMovies(query, page).subscribe((res) => {
    });
  }

  private initialize() {
    this.apiService.getGenres().subscribe((res: any) => {
      this.mapGenres = new Map(res.genres.map((genre: any) => [genre.id, genre.name]));
      this.getPopularMovies(1);
    });
  }

  private getPopularMovies(page: number) {
    this.apiService.getPopularMovies(page).subscribe((res: any) => {
      if (res) {
        this.movies = this.parseResponseToMovie(res);
      }
    });
  }

  private parseResponseToMovie(res: any): Movie[] {
    return res.results.map( (movie: any) => (
      {
        id: movie.id,
        title: movie.title,
        voteAverage: movie.vote_average / 10,
        releaseDate: movie.release_date,
        overview: movie.overview,
        posterPath: `${Utils.baseUrlPoster600w}${movie.poster_path}`,
        genres: this.getGenresThisMovie(movie)
      }));
  }

  private getGenresThisMovie(movie: any): Genre[] {
    return movie.genre_ids.map( (id: number) => (
      { id, name: this.mapGenres.get(id) }
    ));
  }
}
