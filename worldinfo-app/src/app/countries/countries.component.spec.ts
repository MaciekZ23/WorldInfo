import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CountriesComponent } from './countries.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CountryService } from '../services/country.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CountryDetailsComponent } from '../country-details/country-details.component';
import { Country } from '../models/country.model';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({ template: '' })
class DummyComponent {}

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;
  let countryService: jasmine.SpyObj<CountryService>;
  let router: Router;
  let location: Location;

  const mockCountries: Country[] = [
    {
      code: 'PL',
      name: 'Poland',
      capital: 'Warsaw',
      region: 'Europe',
      population: 37950802,
      area: 312679,
      currency: 'PLN',
      languages: ['Polish'],
      timezone: 'UTC+1',
      flag: 'flag-pl.png',
    },
    {
      code: 'DE',
      name: 'Germany',
      capital: 'Berlin',
      region: 'Europe',
      population: 83240525,
      area: 357114,
      currency: 'EUR',
      languages: ['German'],
      timezone: 'UTC+1',
      flag: 'flag-de.png',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CountryService', ['getAllCountries']);

    await TestBed.configureTestingModule({
      imports: [
        CountriesComponent,
        CountryDetailsComponent,
        RouterTestingModule.withRoutes([
          { path: 'countries/:code', component: DummyComponent },
          { path: 'countries', component: DummyComponent },
        ]),
      ],
      providers: [{ provide: CountryService, useValue: spy }],
    }).compileComponents();

    countryService = TestBed.inject(
      CountryService
    ) as jasmine.SpyObj<CountryService>;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
  });

  it('powinien się utworzyć', () => {
    countryService.getAllCountries.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('powinien załadować kraje', fakeAsync(() => {
    countryService.getAllCountries.and.returnValue(of(mockCountries));
    fixture.detectChanges();
    tick();

    expect(component.isLoading).toBeFalse();
    expect(component.countries.length).toBe(2);

    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.country-card'));
    expect(cards.length).toBe(2);
  }));

  it('powinien obsłużyć błąd podczas ładowania', fakeAsync(() => {
    countryService.getAllCountries.and.returnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    tick();

    expect(component.hasError).toBeTrue();
    const errorText = fixture.debugElement.query(By.css('.text-danger'))
      .nativeElement.textContent;
    expect(errorText).toContain('Błąd ładowania danych.');
  }));

  it('powinien nawigować do szczegółów kraju po kliknięciu', fakeAsync(() => {
    countryService.getAllCountries.and.returnValue(of(mockCountries));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const firstCard = fixture.debugElement.query(By.css('.country-card'));
    firstCard.triggerEventHandler('click');
    tick();

    expect(location.path()).toBe('/countries/PL');
  }));

  it('powinien wyczyścić wybrany kraj i nawigować z powrotem', fakeAsync(() => {
    countryService.getAllCountries.and.returnValue(of(mockCountries));
    fixture.detectChanges();
    tick();

    component.selectedCountry = mockCountries[0];
    component.clearSelectedCountry();
    tick();

    expect(location.path()).toBe('/countries');
  }));

  it('powinien ustawić wybrany kraj po podaniu kodu', fakeAsync(() => {
    countryService.getAllCountries.and.returnValue(of(mockCountries));
    fixture.detectChanges();
    tick();

    component.setSelectedByCode('PL');
    expect(component.selectedCountry?.code).toBe('PL');
  }));
});
