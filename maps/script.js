var map = L.map('map').setView([56.946, 24.105], 8);

// Pievienot OpenStreetMap flīzes
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Definēt proj4 transformāciju no EPSG:3059 uz EPSG:4326
proj4.defs("EPSG:3059", "+proj=tmerc +lat_0=0 +lon_0=24 +k=0.9996 +x_0=500000 +y_0=-6000000 +ellps=GRS80 +units=m +no_defs");

// augšupielādējiet datus no json faila
fetch('geomap.json')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            // Konvertesana
            var coords = proj4('EPSG:3059', 'EPSG:4326', feature.geometry.coordinates);
            var lat = coords[1];
            var lng = coords[0];
            // pievienot markerus un popup
            var marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`<b>${feature.properties.PLACENAME}</b><br>${feature.properties.PLACESUBTY}`);
        });
    })
    .catch(error => console.error('Error loading the places data:', error));