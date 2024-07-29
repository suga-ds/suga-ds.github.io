var customIcon = L.icon({
  iconUrl: './images/dot.png', // Path to your image
  iconSize: [16, 16], // Size of the icon
  iconAnchor: [8, 8], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -8] // Point from which the popup should open relative to the iconAnchor
});

var enlargedIcon = L.icon({
  iconUrl: './dot.png', // Path to your image
  iconSize: [20, 20], // Enlarged size of the icon
});

fetch('./cartography/refugisClimàtics.json')
  .then(response => response.json())  // Parse the JSON from the response
  .then(data => {
    // Assuming the relevant data is in data.result.records
    var records = data.result.records;

    // Loop through the data and create markers with the custom icon
    records.forEach(function (location) {
      var marker = L.marker([location.geo_epgs_4326_lat, location.geo_epgs_4326_lon], { icon: customIcon }).addTo(map3);
      marker.bindPopup('<b>' + location.name + '</b><br>' + location.values_value);

      // Add event listeners for mouseover and mouseout
      marker.on('mouseover', function () {
        marker.setIcon(enlargedIcon);
      });
      marker.on('mouseout', function () {
        marker.setIcon(customIcon);
      });
    });
  })
  .catch(error => console.error('Error fetching the JSON data:', error));

// Add a control with the "localització" text
var localitzacioControl = L.control({ position: 'topright' });

localitzacioControl.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'localitzacio-label');
  div.innerHTML = 'LOCALITZACIÓ REFUGIS CLIMÀTICS';
  div.style.backgroundColor = '#f8f8f8';
  this._div.style.padding = '1vh'; // Padding for better spacing
  this._div.style.borderRadius = '0.4vh'; // Rounded corners
  this._div.style.fontSize = '1.6vh'; // Font size
return div;
};

localitzacioControl.addTo(map3);


/*
// Fetch and display the districtes data
fetch('./cartography/barcelonaDistrictes.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#000",
        // fillColor: "#3867A8",
        weight: 1,
        opacity: 0.2,
        fillOpacity: 0
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }
    }).addTo(map3);
  })
  .catch(error => console.error('Error fetching districts data:', error));

fetch('./cartography/barcelonaBarris.json')
  .then(response => response.json())
  .then(data => {
    // Loop through the records in the JSON file
    data.result.records.forEach(function (record) {
      // Parse the WGS84 geometry
      var wgs84Coordinates = record.geometria_wgs84
        .replace('POLYGON ((', '')
        .replace('))', '')
        .split(', ')
        .map(coord => coord.split(' ').map(Number));

      // Create an array of LatLng objects
      var latLngs = wgs84Coordinates.map(coord => [coord[1], coord[0]]);

      // Define style options
      var polygonStyle = {
        color: "#000",
        // fillColor: "#3867A8",
        weight: 0.5,
        opacity: 0.2,
        fillOpacity: 0
      };

      // Add the polygon to the map with style options
      L.polygon(latLngs, polygonStyle).addTo(map3);
    });
  })
  .catch(error => console.error('Error fetching the JSON data:', error));
*/