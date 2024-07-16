// Fetch and plot the escales mecaniques data
fetch('/escalesMecaniques')
  .then(response => response.json())
  .then(data => {
    data.result.records.forEach(record => {
      const lat = record.geo_epgs_4326_lat;
      const lon = record.geo_epgs_4326_lon;
      const name = record.name;
      if (lat && lon) {
        L.circleMarker([lat, lon], {
          radius: 5,
          fillColor: "#000",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map)
          .bindPopup(`<b>${name}</b>`);
      }
    });
  });

// Fetch and display the districtes data
fetch('/districtes')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#000",
        weight: 1,
        opacity: 0.2,
        fillOpacity: 0
      }
    }).addTo(map);
  });

// Fetch and display the barris data
fetch('/barris')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#000",
        weight: 1,
        opacity: 0.1,
        fillOpacity: 0
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }
    }).addTo(map);
  });
