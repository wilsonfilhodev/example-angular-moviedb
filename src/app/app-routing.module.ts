import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './modules/movies/movies-list/movies-list.component';
import { MovieDetailComponent } from './modules/movies/movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: 'movie',
    component: MoviesListComponent
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent
  },
  {
    path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'movie'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
