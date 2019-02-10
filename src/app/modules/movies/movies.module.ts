import { Routes } from '@angular/router';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

@NgModule({
  declarations: [MoviesListComponent, MovieComponent, MovieDetailComponent],
  imports: [
    SharedModule,
    NgxPaginationModule,
    MoviesRoutingModule,
  ],
  exports: [MoviesListComponent, MovieDetailComponent]
})
export class MoviesModule { }
