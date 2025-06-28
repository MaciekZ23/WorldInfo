import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { By } from '@angular/platform-browser';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('powinien się utworzyć', () => {
    expect(component).toBeTruthy();
  });

  it('powinien wyświetlać tytuł z tekstem "O projekcie"', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('O projekcie');
  });

  it('powinien zawierać opis aplikacji', () => {
    const paragraph = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(paragraph.textContent).toContain('WorldInfo');
    expect(paragraph.textContent).toContain('Angularze');
  });

  it('powinien zawierać listę technologii', () => {
    const techHeader = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(techHeader.textContent).toContain('TECHNOLOGIE');

    const listItems = fixture.debugElement.queryAll(
      By.css('ul:first-of-type li')
    );
    expect(listItems.length).toBeGreaterThan(0);
    const techTexts = listItems.map((li) => li.nativeElement.textContent);
    expect(techTexts.some((text) => text.includes('Angular'))).toBeTrue();
    expect(techTexts.some((text) => text.includes('Bootstrap'))).toBeTrue();
  });

  it('powinien zawierać listę funkcjonalności', () => {
    const funcHeaders = fixture.debugElement.queryAll(By.css('h4'));
    const funcHeader = funcHeaders.find((h) =>
      h.nativeElement.textContent.includes('FUNKCJONALNOŚCI')
    );
    expect(funcHeader).toBeTruthy();

    const listItems = fixture.debugElement.queryAll(
      By.css('ul:nth-of-type(2) li')
    );
    expect(listItems.length).toBeGreaterThan(0);
    const funcTexts = listItems.map((li) => li.nativeElement.textContent);
    expect(
      funcTexts.some((text) => text.includes('Przeglądanie listy krajów'))
    ).toBeTrue();
  });

  it('powinien zawierać link do API REST Countries', () => {
    const link = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(link.href).toContain('restcountries.com');
  });
});
