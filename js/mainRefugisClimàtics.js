var customIcon = L.icon({
  iconUrl: '../images/dot.png', // Path to your image
  iconSize: [16, 16], // Size of the icon
  iconAnchor: [8, 8], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -8] // Point from which the popup should open relative to the iconAnchor
});

var enlargedIcon = L.icon({
  iconUrl: '../images/dot.png', // Path to your image
  iconSize: [20, 20], // Enlarged size of the icon
});

fetch('/js/refugisClimàtics.json')
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

var localitzacioControl = L.control({ position: 'topright' });

localitzacioControl.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'localitzacio-label');
  div.innerHTML = '<h4>REFUGIS CLIMÀTICS A BARCELONA</h4>';
  div.style.backgroundColor = 'rgb(248, 248, 248, 0.8)'; // Background color with transparency
  div.style.padding = '1vh'; // Padding for better spacing
  div.style.borderRadius = '0.4vh'; // Rounded corners
  div.style.fontSize = '1.6vh'; // Font size
  return div;
};

localitzacioControl.addTo(map3);