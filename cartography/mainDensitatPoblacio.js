// control that shows state info on hover
const info = L.control();

info.onAdd = function (map2) {
	this._div = L.DomUtil.create('div', 'info');
	this.update();
	return this._div;
};

info.update = function (props) {
	const contents = props ? `<b>${props.name}</b><br />${props.density} hab / ha` : 'Mapa dinàmic';
	this._div.innerHTML = `<h4>Densitat de població</h4>${contents}`;
};

info.addTo(map2);


// get color depending on population density value
function getColor(d) {
	return d > 1000 ? '#53273A' :
		d > 500 ? '#6F344E' :
			d > 200 ? '#8B4161' :
				d > 100 ? '#A64E75' :
					d > 50 ? '#B7668B' :
						d > 20 ? '#C482A0' :
							d > 10 ? '#D19EB5' : '#DEBACA';
}

function style(feature) {
	return {
		weight: 1,
		opacity: 0.5,
		color: 'black',
		// dashArray: '3',
		fillOpacity: 0.9,
		fillColor: getColor(feature.properties.density)
	};
}

function highlightFeature(e) {
	const layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#111',
		dashArray: '',
		fillOpacity: 0.7
	});

	layer.bringToFront();

	info.update(layer.feature.properties);
}

/* global statesData */
const geojson = L.geoJson(statesData, {
	style,
	onEachFeature
}).addTo(map2);

function resetHighlight(e) {
	geojson.resetStyle(e.target);
	info.update();
}

function zoomToFeature(e) {
	map2.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

map2.attributionControl.addAttribution('Dades de població &copy; <a href="https://opendata-ajuntament.barcelona.cat/data/es/dataset/20170706-districtes-barris/resource/b21fa550-56ea-4f4c-9adc-b8009381896e">Ajuntament de Barcelona</a>');


const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map2) {

	const div = L.DomUtil.create('div', 'info legend');
	const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
	const labels = [];
	let from, to;

	// Add inline CSS for the font color
	div.style.color = 'whhite'; // Change 'blue' to any color you want


	for (let i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
	}

	div.innerHTML = labels.join('<br>');
	return div;
};

legend.addTo(map2);