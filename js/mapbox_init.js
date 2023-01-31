// Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiYm91eHkiLCJhIjoiY2szaGdyMHZxMDNhbTNwbnVudW0zNzh3NiJ9.BnhL9Tx9dwjiaQavX1F6PA';
// Map creation
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/bouxy/cldejgtgt008e01t7me8x9caf/draft', // style URL
    projection: 'globe', // Display the map as a globe
    center: [16.47, -22.79], // starting position [lng, lat]
    zoom: 5 // starting zoom
});

map.on('load', async () => {

    // 360 images custom marker
    map.loadImage('img/360.png', (error, image) => {
        if (error) throw error;
        map.addImage('logo_360', image);
    });

    // 360 images geojson
    map.addSource('360', {
        'type': 'geojson',
        'data': 'geom/360.geojson'
    });
    map.addLayer({
        'id': '360',
        'type': 'symbol',
        'source': '360',
        'layout': {
            'icon-image': 'logo_360',
            'icon-size': 0.15
        }
    });

    // Routes geojson
    // We fetch the JSON here so that we can parse and use it separately
    // from GL JS's use in the added source.
    const response = await fetch('geom/routes.geojson');
    data = await response.json();
    // save full coordinate list for later
    coordinates = data.features[0].geometry.coordinates;
 
    // start by showing just the first coordinate
    data.features[0].geometry.coordinates = [coordinates[0]];

    map.addSource('routes', {
        'type': 'geojson',
        'data': data
    });
    map.addLayer({
        'id': 'routes',
        'type': 'line',
        'source': 'routes',
        'paint': {
            'line-color': 'yellow',
            'line-opacity': 0.75,
            'line-width': 5
        }
    });
});

// Map inclination
map.setPitch(30);