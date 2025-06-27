import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl =
    'https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,cca2,languages,currencies,area,timezones';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((data) =>
        data.map((c) => ({
          name: c.name.common,
          capital: c.capital ? c.capital[0] : 'brak',
          region: c.region,
          population: c.population,
          flag: c.flags?.png,
          code: c.cca2,
          languages: c.languages ? Object.values(c.languages) : [],
          currency: c.currencies ? Object.keys(c.currencies)[0] : 'brak',
          area: c.area ?? 0,
          timezone: c.timezones?.[0] || 'brak'
        }))
      ),
      catchError((err) => {
        console.error('Błąd podczas pobierania krajów:', err);
        return throwError(() => new Error('Błąd API'));
      })
    );
  }
}
