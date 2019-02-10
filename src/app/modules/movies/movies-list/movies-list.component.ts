import { Utils } from './../../../models/utils';
import { Movie } from './../../../models/movie';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { log } from 'util';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  private searchInput: string;

  movies = new Array<Movie>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getPopularMovies(1);
  }

  selectMovie(event: Event) {
    console.log('Called select movie...' , event);
  }

  selectGenre(event: Event) {
    console.log('Called select genre...' , event);
  }

  private searchMovie(query: string, page: number) {
    this.apiService.getMovies(query, page).subscribe((res) => {
      console.log(res);
    });
  }

  private getPopularMovies(page: number) {
    this.apiService.getPopularMovies(page).subscribe((res) => {
      console.log(res);
      if (res) {
        this.parseResponseToMovie(res);
      }
    });
  }

  private parseResponseToMovie(res: any) {
    this.movies = res.results.map( (movie: any) => (
      {
        id: movie.id,
        title: movie.title,
        voteAverage: Number(movie.vote_average) / 10,
        releaseDate: movie.release_date,
        overview: movie.overview || 'Nenhum resumo cadastrado para este filme.',
        posterPath: `${Utils.baseUrlPoster600w}${movie.poster_path}`,
        genres: []
      }));
  }
}
