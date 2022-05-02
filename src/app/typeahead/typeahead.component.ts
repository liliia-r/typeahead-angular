import { SwapiService } from './../swapi.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, EMPTY } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError,
} from 'rxjs/operators';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent implements OnInit {
  search = new FormControl();
  errorMessage = '';

  search$: Observable<string> = this.search.valueChanges;

  character$: Observable<any>;

  searchResults$ = this.search$.pipe(
    tap((_) => (this.errorMessage = '')),
    debounceTime(600),
    distinctUntilChanged(),
    switchMap((query) => {
      return this.swapiService.search(query).pipe(
        catchError((error) => {
          this.errorMessage = error;
          return EMPTY;
        })
      );
    })
  );

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {}
}
