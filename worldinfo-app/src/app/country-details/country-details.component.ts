import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-details',
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  standalone: true,
})
export class CountryDetailsComponent {
  @Input() country: any;
  @Output() close = new EventEmitter<void>();
}
