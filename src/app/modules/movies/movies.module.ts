import { SearchBoxComponent } from './../../components/search-box/search-box.component';
import { Routes } from '@angular/router';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import {NgxPaginationModule} from 'ngx-pagination';

import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { DurationPipePipe } from 'src/app/components/duration-pipe.pipe';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    MoviesListComponent,
    MovieComponent,
    MovieDetailComponent,
    SearchBoxComponent,
    DurationPipePipe],
  imports: [
    SharedModule,
    NgxPaginationModule,
    MoviesRoutingModule,
  ],
  exports: [MoviesListComponent, MovieDetailComponent],
  providers: [NgxUiLoaderService]
})
export class MoviesModule { }
