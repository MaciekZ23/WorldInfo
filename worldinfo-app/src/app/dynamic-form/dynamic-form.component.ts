import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField } from '../models/form-field.model';

declare const bootstrap: any;

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})

export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() fields: FormField[] = [];
  @Input() formTitle: string = '';
  @Input() isOpen: boolean = false;
  @Output() formSubmitted = new EventEmitter<FormField[]>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  idModal: string = 'formModalKontakt';

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.openForm();
    }
  }

  private buildForm(): void {
    const group: any = {};
    this.fields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);

      const defaultValue = field.type === 'checkbox' ? false : field.value || '';
      group[field.name] = new FormControl(defaultValue, validators);
    });
    this.form = new FormGroup(group);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedFields = this.fields.map(field => ({
        ...field,
        value: this.form.get(field.name)?.value
      }));

      this.formSubmitted.emit(updatedFields);

      this.resetForm();
      this.closeForm();
    }
  }

  onClose(): void {
    this.resetForm();
    this.closeForm();
  }

  private resetForm(): void {
    const resetValues: any = {};
    this.fields.forEach(field => {
      resetValues[field.name] = field.type === 'checkbox' ? false : '';
    });
    this.form.reset(resetValues);
  }

  private openForm(): void {
    const modalElement = document.getElementById(this.idModal);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false
      });
      modal.show();
    }
  }

  private closeForm(): void {
    const modalElement = document.getElementById(this.idModal);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
    this.close.emit();
  }
}