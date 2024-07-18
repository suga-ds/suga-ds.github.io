// Define a function to set the color for each feature based on population density
function getColor(density) {
  return density > 1000 ? '#53273A' :
    density > 700 ? '#7D3B58' :
      density > 400 ? '#A64E75' :
        density > 100 ? '#BE7495' :
          '#D19EB5';
}

// Define the style for each feature
function style(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 0.3,
    color: 'black',
    fillOpacity: 1
  };
}

// Logic to digest and merge data:
// Load the barris polygons, select specofic values.
Promise.all([
  fetch('./cartography/barcelonaBarris.geojson').then(response => response.json()),
  fetch('./cartography/densitatPoblacio.geojson').then(response => response.json())
]).then(([barrisData, densityData]) => {
  // Create a mapping of neighborhood ids to density values
  const densityMap = {};
  densityData.features.forEach(feature => {
    const { Neighborhood_Code, Net_Density_hab_per_ha } = feature.properties;
    densityMap[Neighborhood_Code] = Net_Density_hab_per_ha;
  });

  // Merge the density data with the barris polygons
  barrisData.features.forEach(feature => {
    const neighborhoodCode = parseInt(feature.properties.codi_barri, 10);
    const density = densityMap[neighborhoodCode] || 0; // Default to 0 if density is not found
    feature.properties.density = density; // ads 'density' : <density value> key pair to barris object
  });

  // Add the GeoJSON layer to the map2
  L.geoJson(barrisData, {
    style,
  }).addTo(map2); // Loads barris merged object
});

fetch('./cartography/barcelonaDistrictes.geojson') // Load districts data.
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: "#000",
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }
    }).addTo(map2);
  })
  .catch(error => console.error('Error fetching districts data:', error));