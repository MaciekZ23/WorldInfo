import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormField } from '../models/form-field.model';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  const mockFields: FormField[] = [
    { name: 'name', label: 'Imię', type: 'text', required: true, value: '' },
    { name: 'email', label: 'Email', type: 'email', required: true, value: '' },
    {
      name: 'agree',
      label: 'Zgoda',
      type: 'checkbox',
      required: true,
      value: false,
    },
    {
      name: 'message',
      label: 'Wiadomość',
      type: 'textarea',
      required: false,
      value: '',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.fields = mockFields;
    fixture.detectChanges();
  });

  it('powinien się utworzyć', () => {
    expect(component).toBeTruthy();
  });

  it('powinien utworzyć formularz na podstawie pól', () => {
    expect(component.form.contains('name')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('agree')).toBeTrue();
    expect(component.form.contains('message')).toBeTrue();
  });

  it('powinien walidować wymagane pola', () => {
    const nameCtrl = component.form.get('name');
    const emailCtrl = component.form.get('email');
    const agreeCtrl = component.form.get('agree');

    nameCtrl?.setValue('');
    emailCtrl?.setValue('');
    agreeCtrl?.setValue(false);

    expect(nameCtrl?.valid).toBeFalse();
    expect(emailCtrl?.valid).toBeFalse();
    expect(agreeCtrl?.valid).toBeFalse();
  });

  it('powinien walidować poprawność adresu email', () => {
    const emailCtrl = component.form.get('email');
    emailCtrl?.setValue('invalid-email');
    expect(emailCtrl?.valid).toBeFalse();

    emailCtrl?.setValue('test@example.com');
    expect(emailCtrl?.valid).toBeTrue();
  });

  it('powinien emitować dane po poprawnym submit', () => {
    const spy = spyOn(component.formSubmitted, 'emit');

    component.form.get('name')?.setValue('Jan');
    component.form.get('email')?.setValue('jan@example.com');
    component.form.get('agree')?.setValue(true);
    component.form.get('message')?.setValue('Testowa wiadomość');

    component.onSubmit();

    expect(spy).toHaveBeenCalled();

    const emittedData = spy.calls.mostRecent().args[0];
    expect(emittedData).toEqual([
      {
        name: 'name',
        label: 'Imię',
        type: 'text',
        required: true,
        value: 'Jan',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        value: 'jan@example.com',
      },
      {
        name: 'agree',
        label: 'Zgoda',
        type: 'checkbox',
        required: true,
        value: true,
      },
      {
        name: 'message',
        label: 'Wiadomość',
        type: 'textarea',
        required: false,
        value: 'Testowa wiadomość',
      },
    ]);
  });

  it('powinien nie emitować danych jeśli formularz jest niepoprawny', () => {
    spyOn(component.formSubmitted, 'emit');
    component.form.get('name')?.setValue('');
    component.form.get('email')?.setValue('');
    component.form.get('agree')?.setValue(false);

    component.onSubmit();

    expect(component.formSubmitted.emit).not.toHaveBeenCalled();
  });

  it('powinien emitować close po kliknięciu zamknij', () => {
    spyOn(component.close, 'emit');
    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('powinien resetować formularz po zamknięciu', () => {
    component.form.get('name')?.setValue('Jan');
    component.form.get('agree')?.setValue(true);
    component.onClose();
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('agree')?.value).toBeFalse();
  });
});
