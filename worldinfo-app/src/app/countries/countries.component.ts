import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../services/country.service';
import { CountryDetailsComponent } from '../country-details/country-details.component';

@Component({
  selector: 'app-countries',
  imports: [CommonModule, CountryDetailsComponent],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  standalone: true
})

export class CountriesComponent implements OnInit {
  countries: any[] = [];
  selectedCountry: any = null;
  isLoading = false;
  hasError = false;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries() {
    this.isLoading = true;
    this.hasError = false;
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }

  clearSelectedCountry() {
    this.selectedCountry = null;
  }
}
