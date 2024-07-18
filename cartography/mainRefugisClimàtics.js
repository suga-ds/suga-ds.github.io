var customIcon = L.icon({
  iconUrl: './dot.png', // Path to your image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});


fetch('./cartography/refugisClimàtics.json')
  .then(response => response.json())  // Parse the JSON from the response
  .then(data => {
    // Assuming the relevant data is in data.result.records
    var records = data.result.records;

    // Loop through the data and create markers with the custom icon
    records.forEach(function (location) {
      var marker = L.marker([location.geo_epgs_4326_lat, location.geo_epgs_4326_lon], { icon: customIcon }).addTo(map);
      marker.bindPopup('<b>' + location.name + '</b><br>' + location.values_value);
    });
  })
  .catch(error => console.error('Error fetching the JSON data:', error));

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
    }).addTo(map1);
  })
  .catch(error => console.error('Error fetching districts data:', error));

// Fetch and display the barris data
fetch('./cartography/barcelonaBarris.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#000",
        // fillColor: "#3867A8",
        weight: 1,
        opacity: 0.1,
        fillOpacity: 0
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }
    }).addTo(map1);
  })
  .catch(error => console.error('Error fetching barris data:', error));