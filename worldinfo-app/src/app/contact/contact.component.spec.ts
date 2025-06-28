import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { By } from '@angular/platform-browser';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormField } from '../models/form-field.model';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('powinien się utworzyć', () => {
    expect(component).toBeTruthy();
  });

  it('powinien wyświetlać tytuł "Kontakt"', () => {
    const heading = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(heading.textContent).toContain('Kontakt');
  });

  it('powinien zawierać przycisk do otwarcia formularza', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.textContent).toContain('Skontaktuj się z nami');
    expect(button.getAttribute('data-bs-toggle')).toBe('modal');
    expect(button.getAttribute('data-bs-target')).toBe('#formModalKontakt');
  });

  it('powinien przekazywać pola do dynamicznego formularza', () => {
    const dynamicForm = fixture.debugElement.query(
      By.directive(DynamicFormComponent)
    );
    expect(dynamicForm).toBeTruthy();
    expect(dynamicForm.componentInstance.fields.length).toBe(
      component.contactFields.length
    );
  });

  it('powinien wywołać onFormSubmit po emitowaniu formSubmitted', () => {
    spyOn(component, 'onFormSubmit');
    const dynamicForm = fixture.debugElement.query(
      By.directive(DynamicFormComponent)
    ).componentInstance;

    const testFields: FormField[] = [
      {
        name: 'fullName',
        label: '',
        type: 'text',
        required: true,
        value: 'Jan Kowalski',
      },
    ];

    dynamicForm.formSubmitted.emit(testFields);
    expect(component.onFormSubmit).toHaveBeenCalledWith(testFields);
  });

  it('powinien wywołać onCloseForm po emitowaniu close', () => {
    spyOn(component, 'onCloseForm');
    const dynamicForm = fixture.debugElement.query(
      By.directive(DynamicFormComponent)
    ).componentInstance;

    dynamicForm.close.emit();
    expect(component.onCloseForm).toHaveBeenCalled();
  });
});
