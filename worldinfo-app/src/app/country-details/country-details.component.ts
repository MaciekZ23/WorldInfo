import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Country {
  name: string;
  capital: string;
  flag: string;
  region: string;
  population: number;
  area?: number;
  currency?: string;
  languages?: string[];
  timezone?: string;
}

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
