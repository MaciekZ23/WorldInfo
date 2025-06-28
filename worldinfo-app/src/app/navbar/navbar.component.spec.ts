import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'countries', component: DummyComponent },
          { path: 'map', component: DummyComponent },
          { path: 'about', component: DummyComponent },
          { path: 'contact', component: DummyComponent },
        ]),
        NavbarComponent,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('powinien się utworzyć', () => {
    expect(component).toBeTruthy();
  });

  it('powinien zawierać link do /countries', () => {
    const links = fixture.debugElement.queryAll(By.css('a.nav-link'));
    const countriesLink = links.find((de) =>
      de.nativeElement.textContent.includes('Kraje')
    );
    expect(countriesLink).toBeTruthy();
  });

  it('powinien wyświetlać tekst WorldInfo', () => {
    const brand = fixture.debugElement.query(
      By.css('.navbar-brand span')
    )?.nativeElement;
    expect(brand?.textContent).toContain('WorldInfo');
  });

  it('powinien dodać klasę active dla /countries po nawigacji', fakeAsync(() => {
    router.navigate(['/countries']);
    tick();
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a.nav-link'));
    const countriesLink = links.find((de) =>
      de.nativeElement.textContent.includes('Kraje')
    )?.nativeElement;
    expect(countriesLink.classList).toContain('active');
  }));

  it('powinien dodać klasę active dla /map po nawigacji', fakeAsync(() => {
    router.navigate(['/map']);
    tick();
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a.nav-link'));
    const mapLink = links.find((de) =>
      de.nativeElement.textContent.includes('Mapa')
    )?.nativeElement;
    expect(mapLink.classList).toContain('active');
  }));

  it('powinien dodać klasę active dla /about po nawigacji', fakeAsync(() => {
    router.navigate(['/about']);
    tick();
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a.nav-link'));
    const aboutLink = links.find((de) =>
      de.nativeElement.textContent.includes('O projekcie')
    )?.nativeElement;
    expect(aboutLink.classList).toContain('active');
  }));

  it('powinien dodać klasę active dla /contact po nawigacji', fakeAsync(() => {
    router.navigate(['/contact']);
    tick();
    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.css('a.nav-link'));
    const contactLink = links.find((de) =>
      de.nativeElement.textContent.includes('Kontakt')
    )?.nativeElement;
    expect(contactLink.classList).toContain('active');
  }));
});
