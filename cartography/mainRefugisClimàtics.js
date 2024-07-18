
const response = await fetch('./cartography/refugisClimàtics.json')
const json = await response.json();
const data = JSON.stringify(json, null, 2);
data.result.records.forEach(record => {
    var marker = L.marker([location.geo_epgs_4326_lat, location.geo_epgs_4326_lon]).addTo(map3);
    marker.bindPopup('<b>' + location.name + '</b><br>' + location.values_value);
});