import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent {
  @Input() country!: Country;
  @Output() close = new EventEmitter<void>();

  closePanel(): void {
    this.close.emit();
  }
}
