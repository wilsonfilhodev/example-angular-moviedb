import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Output() goToSelectMovie = new EventEmitter<string>();

  @Output() goToSelectGenre = new EventEmitter<string>();

  @Input() movie;

  constructor() { }

  ngOnInit() {
  }

  selectMovie(idFilme: string) {
    this.goToSelectMovie.emit(idFilme);
  }

  selectGenre(idGenre: string) {
    this.goToSelectGenre.emit(idGenre);
  }
}
