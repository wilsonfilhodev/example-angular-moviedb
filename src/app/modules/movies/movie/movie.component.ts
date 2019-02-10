import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Output() goToSelectMovie = new EventEmitter<number>();

  @Output() goToSelectGenre = new EventEmitter<number>();

  @Input() movie;

  constructor() { }

  ngOnInit() {
  }

  selectMovie(id: number) {
    this.goToSelectMovie.emit(id);
  }

  selectGenre(id: number) {
    this.goToSelectGenre.emit(id);
  }
}
