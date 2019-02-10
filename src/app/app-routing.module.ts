import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './modules/movies/movies-list/movies-list.component';
import { MovieDetailComponent } from './modules/movies/movie-detail/movie-detail.component';

const routes: Routes = [
  {path: '', component: MoviesListComponent},
  {path: 'movie/:id', component: MovieDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
