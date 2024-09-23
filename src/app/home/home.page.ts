import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([35.76943, -580081], 13); // Perbaiki longitude

    // Layer OSM
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Layer CartoDB Positron
    const cartoDBLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.carto.com/attributions">CARTO</a>',
    });

    // Layer CartoDB Dark Matter
    const darkMatterLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.carto.com/attributions">CARTO</a>',
    });

    // Layer Esri World Imagery
    const esriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="http://www.esri.com/">Esri</a>',
    });

    // Menambahkan layer OSM ke peta
    osmLayer.addTo(this.map);

    // Koordinat dan nama tempat
    const locationName = "Ini Lokasi";
    const locationCoords: [number, number] = [35.76943, -580081]; // Koordinat yang benar

    // Menambahkan marker merah sederhana
    const circleMarker = L.circleMarker(locationCoords, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 10, // Radius dalam piksel
    }).addTo(this.map);

    circleMarker.bindPopup(`${locationName}<br>Koordinat: ${locationCoords[0]}, ${locationCoords[1]}`).openPopup();

    // Layer control untuk mengganti base map
    const baseMaps = {
      "OpenStreetMap": osmLayer,
      "CartoDB Positron": cartoDBLayer,
      "CartoDB Dark Matter": darkMatterLayer,
      "Esri World Imagery": esriWorldImagery, // Pastikan untuk mengganti YOUR_MAPBOX_ACCESS_TOKEN dengan token Mapbox yang valid
    };

    L.control.layers(baseMaps).addTo(this.map);
  }
}
