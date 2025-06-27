import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from '../services/country.service';
import { CountryDetailsComponent } from '../country-details/country-details.component';
import { Country } from '../models/country.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-countries',
  imports: [CommonModule, CountryDetailsComponent],
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  standalone: true
})

export class CountriesComponent implements OnInit {
  countries: Country[] = [];
  selectedCountry: Country | null = null;
  isLoading = false;
  hasError = false;

  constructor(
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchCountries();

    this.route.paramMap.subscribe(params => {
      const code = params.get('code');
      if (code && this.countries.length > 0) {
        this.setSelectedByCode(code);
      }
    });
  }

  fetchCountries() {
    this.isLoading = true;
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.isLoading = false;

        // Jeśli URL już zawiera kod
        const code = this.route.snapshot.paramMap.get('code');
        if (code) {
          this.setSelectedByCode(code);
        }
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  setSelectedByCode(code: string) {
    this.selectedCountry = this.countries.find(c => c.code === code) || null;
  }

  selectCountry(country: Country) {
    this.router.navigate(['/countries', country.code]);
  }

  clearSelectedCountry() {
    this.router.navigate(['/countries']);
  }
}
