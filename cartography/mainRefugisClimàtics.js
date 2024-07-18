
const response = fetch('./cartography/refugisClimàtics.json')
const json = await response.json();
const data = JSON.stringify(json, null, 2);
data.result.records.forEach(record => {
    var marker = L.marker([location.geo_epgs_4326_lat, location.geo_epgs_4326_lon]).addTo(map3);
    marker.bindPopup('<b>' + location.name + '</b><br>' + location.values_value);
});

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