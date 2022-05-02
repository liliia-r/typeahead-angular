import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    const url = `https://swapi.dev/api/people/?search=${query}`;
    return this.http.get(url).pipe(
      map((result) => (result as any).results),
      catchError((error) => {
        throw new Error('Something went wrong');
      })
    );
  }
}
