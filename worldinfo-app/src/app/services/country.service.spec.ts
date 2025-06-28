import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService],
    });

    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('powinien się utworzyć', () => {
    expect(service).toBeTruthy();
  });

  it('powinien pobrać i przemapować kraje', () => {
    const mockApiResponse = [
      {
        name: { common: 'Poland' },
        capital: ['Warsaw'],
        region: 'Europe',
        population: 37950802,
        flags: { png: 'flag.png' },
        cca2: 'PL',
        languages: { pol: 'Polish' },
        currencies: { PLN: { name: 'Zloty' } },
        area: 312679,
        timezones: ['UTC+01:00'],
      },
    ];

    service.getAllCountries().subscribe((countries) => {
      expect(countries.length).toBe(1);
      expect(countries[0].name).toBe('Poland');
      expect(countries[0].capital).toBe('Warsaw');
      expect(countries[0].region).toBe('Europe');
      expect(countries[0].population).toBe(37950802);
      expect(countries[0].flag).toBe('flag.png');
      expect(countries[0].code).toBe('PL');
      expect(countries[0].languages).toContain('Polish');
      expect(countries[0].currency).toBe('PLN');
      expect(countries[0].area).toBe(312679);
      expect(countries[0].timezone).toBe('UTC+01:00');
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('powinien obsłużyć błąd API', () => {
    service.getAllCountries().subscribe({
      next: () => fail('Oczekiwano błędu'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.message).toBe('Błąd API');
      },
    });

    const req = httpMock.expectOne(service['apiUrl']);
    req.flush('Błąd serwera', { status: 500, statusText: 'Server Error' });
  });
});
