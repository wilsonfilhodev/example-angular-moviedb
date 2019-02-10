import { Utils } from './../../../models/utils';
import { ApiService } from './../../../services/api.service';
import { Movie } from './../../../models/movie';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movie = new Movie();

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    const id =  this.route.snapshot.params.id;

    if (id) {
      this.getMovie(id);
    }
  }

  private getMovie(id: number) {
    this.apiService.getMovieById(id).subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.parseResponseToMovie(res);
        }
    });
  }

  private parseResponseToMovie(res: any) {
    const movie = {
        id: res.id,
        title: res.title,
        voteAverage: res.vote_average / 10,
        releaseDate: res.release_date,
        overview: res.overview,
        posterPath: `${Utils.baseUrlPoster600w}${res.poster_path}`,
        genres: res.genres,
        status: res.status,
        language: res.language,
        runtime: res.runtime,
        video: res.video,
        budget: res.budget,
        revenue: res.revenue,
        profet: res.revenue,
        trailer: res.trailer
      };
    this.movie = movie;
  }
}
