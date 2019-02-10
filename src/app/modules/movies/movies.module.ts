import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [MoviesListComponent, MovieComponent],
  imports: [
    SharedModule
  ],
  exports: [MoviesListComponent]
})
export class MoviesModule { }
