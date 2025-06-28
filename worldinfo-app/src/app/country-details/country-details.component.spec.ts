import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryDetailsComponent } from './country-details.component';
import { By } from '@angular/platform-browser';
import { Country } from '../models/country.model';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;

  const mockCountry: Country = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
  });

  it('powinien się utworzyć', () => {
    expect(component).toBeTruthy();
  });

  it('powinien wyświetlać szczegóły kraju', () => {
    component.country = mockCountry;
    fixture.detectChanges();

    const name = fixture.debugElement.query(By.css('h5')).nativeElement
      .textContent;
    expect(name).toContain('Poland');

    const capital = fixture.debugElement.query(By.css('.details-body'))
      .nativeElement.textContent;
    expect(capital).toContain('Stolica: Warsaw');
    expect(capital).toContain('Region: Europe');
    expect(capital).toContain('Populacja: 37,950,802');
    expect(capital).toContain('Powierzchnia: 312,679 km²');
    expect(capital).toContain('Waluta: PLN');
    expect(capital).toContain('Języki: Polish');
    expect(capital).toContain('Strefa czasowa: UTC+1');
  });

  it('powinien emitować zdarzenie close po kliknięciu przycisku', () => {
    component.country = mockCountry;
    spyOn(component.close, 'emit');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('nie powinien renderować niczego jeśli country jest null', () => {
    component.country = null as any;
    fixture.detectChanges();

    const panel = fixture.debugElement.query(By.css('.country-details-panel'));
    expect(panel).toBeNull();
  });
});
