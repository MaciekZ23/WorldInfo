import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormField } from '../models/form-field.model';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactFields: FormField[] = [
    {
      name: 'fullName',
      label: 'Imię i nazwisko',
      type: 'text',
      required: true,
      placeholder: 'Wpisz swoje imię i nazwisko',
      totalSpan: 12,
      actualSpan: 12
    },
    {
      name: 'email',
      label: 'Adres e-mail',
      type: 'email',
      required: true,
      placeholder: 'Wpisz swój e-mail',
      totalSpan: 12,
      actualSpan: 12
    },
    {
      name: 'subject',
      label: 'Temat',
      type: 'text',
      required: true,
      placeholder: 'Temat wiadomości',
      totalSpan: 12,
      actualSpan: 12
    },
    {
      name: 'message',
      label: 'Wiadomość',
      type: 'textarea',
      required: true,
      placeholder: 'Napisz wiadomość...',
      rows: 6,
      totalSpan: 12,
      actualSpan: 12
    },
    {
      name: 'privacy',
      label: 'Wyrażam zgodę na przetwarzanie moich danych osobowych',
      type: 'checkbox',
      required: true,
      value: false,
      totalSpan: 12,
      actualSpan: 12
    }
  ];

  contactTitle = 'Formularz kontaktowy';

  onFormSubmit(fields: FormField[]) {
    const formValues = fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as Record<string, any>);

    console.log('Wysłane dane:', formValues);
    alert('Dziękujemy za kontakt!');
  }

  onCloseForm(): void {
    console.log('Formularz został zamknięty.');
  }
}
