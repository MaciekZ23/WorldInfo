import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20, 0],
      zoom: 2,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    fetch('assets/custom.geo.json')
      .then((res) => res.json())
      .then((geoData) => {
        const geoJsonLayer = L.geoJSON(geoData, {
          onEachFeature: (feature, layer) => {
            layer.on({
              mouseover: () =>
                (layer as L.Path).setStyle({ fillColor: '#2E7D32' }),
              mouseout: () => geoJsonLayer.resetStyle(layer),
              click: () => {
                const code = feature.properties.iso_a2; // albo iso_a3, jak wolisz
                if (code) {
                  this.router.navigate(['/countries', code]);
                }
              },
            });
            layer.bindTooltip(feature.properties.name);
          },
          style: () => ({
            color: 'white',
            weight: 1,
            fillColor: 'lightblue',
            fillOpacity: 0.6,
          }),
        });
        geoJsonLayer.addTo(this.map);
      });
  }
}
