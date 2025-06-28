import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MapComponent } from './map.component';
import { Router } from '@angular/router';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
  });

  it('powinien się utworzyć', () => {
    expect(component).toBeTruthy();
  });

  it('powinien wywołać initMap po ngAfterViewInit', () => {
    const initMapSpy = spyOn<any>(component, 'initMap');
    component.ngAfterViewInit();
    expect(initMapSpy).toHaveBeenCalled();
  });

  it('powinien załadować geojson i dodać warstwę do mapy', fakeAsync(async () => {
    const mockGeoJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'TestCountry', iso_a2: 'TC' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 0],
                [0, 0],
              ],
            ],
          },
        },
      ],
    };

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve(mockGeoJson),
      }) as any
    );

    component.ngAfterViewInit();
    tick();
    expect(window.fetch).toHaveBeenCalledWith('assets/custom.geo.json');
  }));

  it('powinien nawigować do kraju po kliknięciu na feature', fakeAsync(async () => {
    const mockGeoJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: 'TestCountry', iso_a2: 'TC' },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 0],
                [0, 0],
              ],
            ],
          },
        },
      ],
    };

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve(mockGeoJson),
      }) as any
    );

    component.ngAfterViewInit();
    tick();
    component['router'].navigate(['/countries', 'TC']);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/countries', 'TC']);
  }));
});
