import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
        NavbarComponent,
        DummyComponent,
        RouterTestingModule.withRoutes([
          { path: 'countries', component: DummyComponent },
          { path: 'map', component: DummyComponent },
          { path: 'about', component: DummyComponent },
          { path: 'contact', component: DummyComponent }
        ])
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('powinien się utworzyć', () => {
    expect(component).toBeTruthy();
  });

  it('powinien zawierać link do /countries', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/countries"]'));
    expect(link).toBeTruthy();
  });

  it('powinien wyświetlać tekst WorldInfo', () => {
    const brand = fixture.debugElement.query(By.css('.navbar-brand span')).nativeElement;
    expect(brand.textContent).toContain('WorldInfo');
  });

  it('powinien dodać klasę active dla /countries po nawigacji', fakeAsync(() => {
    router.navigate(['/countries']);
    tick();
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a[routerLink="/countries"]')).nativeElement;
    expect(link.classList).toContain('active');
  }));

  it('powinien dodać klasę active dla /map po nawigacji', fakeAsync(() => {
    router.navigate(['/map']);
    tick();
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a[routerLink="/map"]')).nativeElement;
    expect(link.classList).toContain('active');
  }));

  it('powinien dodać klasę active dla /about po nawigacji', fakeAsync(() => {
    router.navigate(['/about']);
    tick();
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a[routerLink="/about"]')).nativeElement;
    expect(link.classList).toContain('active');
  }));

  it('powinien dodać klasę active dla /contact po nawigacji', fakeAsync(() => {
    router.navigate(['/contact']);
    tick();
    fixture.detectChanges();

    const link = fixture.debugElement.query(By.css('a[routerLink="/contact"]')).nativeElement;
    expect(link.classList).toContain('active');
  }));
});
