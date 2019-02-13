import { Utils } from './../../../models/utils';
import { ApiService } from './../../../services/api.service';
import { Movie } from './../../../models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movie = new Movie();
  public trailer = '';
  public id: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public domSanitizer: DomSanitizer,
    private loadingService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);

    if (this.id) {
      this.getMovie(this.id);
    }
  }

  private async getMovie(id: number) {
    this.loadingService.start();
    const response = await this.apiService.getMovieById(id);
    if (response) {
      this.movie = this.parseResponseToMovie(response);
      const keyTrailer = await this.apiService.getTrailer(id);
      this.trailer = this.getTrailerMovie(keyTrailer);
      this.loadingService.stop();
    } else {
      this.loadingService.stop();
    }
  }

  private getTrailerMovie(keyTrailer: any): string {
    if (keyTrailer.results.length) {
      return `${Utils.pathTrailerYoutube}${keyTrailer.results[0].key}`;
    }
  }
  private parseResponseToMovie(res: any) {
    return {
        id: res.id,
        title: res.title,
        voteAverage: res.vote_average / 10,
        releaseDate: res.release_date,
        overview: res.overview,
        posterPath: `${Utils.baseUrlPoster600w}${res.poster_path}`,
        genres: res.genres,
        status: res.status,
        language: res.spoken_languages ? res.spoken_languages[0].name : '',
        runtime: res.runtime,
        video: res.video,
        budget: res.budget,
        revenue: res.revenue,
        profet: res.revenue,
        trailer: res.trailer
      };
  }
}
