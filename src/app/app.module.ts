import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { MoviesModule } from './modules/movies/movies.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    MoviesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
