import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';

import { ApiService } from './../../services/api.service';
import { Movie } from './../../models/movie';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Output() loading = new EventEmitter<boolean>();
  @Output() results = new EventEmitter<Movie[]>();

  constructor(
      private apiService: ApiService,
      private el: ElementRef
    ) { }

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'keyup').pipe(
      map((e: any) => e.target.value),
      debounceTime(500),
      tap(() => this.loading.emit(true)),
      map((query: string) => this.apiService.searchMovies(query, 1)),
      switchAll())
      .subscribe( (results: Movie[]) => {
          this.loading.emit(false);
          this.results.emit(results);
        },
        err => {
          this.loading.emit(false);
        },
        () => {
          this.loading.emit(false);
        }
      );
  }
}
