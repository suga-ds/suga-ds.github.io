// Define a function to set the style for bike lanes
function bikeLaneStyle(feature) {
  return {
    color: '#7D3B58',
    weight: 2,
    opacity: 0.7
  };
}

// Load the bike lanes GeoJSON data
fetch('./cartography/carrilBici.geojson')
  .then(response => response.json())
  .then(data => {
    // Add the GeoJSON layer to the map1 with the specified style
    L.geoJson(data, { style: bikeLaneStyle }).addTo(map1);
  })
  .catch(error => console.error('Error fetching bike lanes data:', error));

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