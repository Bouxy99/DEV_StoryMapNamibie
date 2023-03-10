// Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiYm91eHkiLCJhIjoiY2xkc3RiemUzMHZvMTNvcGZkNnpvaDd2MSJ9.zVHlxjut0M9SBg4_vyTScA';
// Map creation
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL mapbox://styles/bouxy/cldejgtgt008e01t7me8x9caf/draft
    projection: 'globe', // Display the map as a globe
    center: [16.47, -22.79], // starting position [lng, lat]
    zoom: 5, // starting zoom
    antialias: true
});


map.on('load', async () => {

    // Add 3D Terrain
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

    // Add Building

    map.addLayer(
        {
            'id': 'add-3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // Use an 'interpolate' expression to
                // add a smooth transition effect to
                // the buildings as the user zooms in.
                'fill-extrusion-height': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'height']
                ],
                'fill-extrusion-base': [
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    15,
                    0,
                    15.05,
                    ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.8
            }
        }
    );

    // 360 images custom marker
    map.loadImage('img/logo/360.png', (error, image) => {
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
    const response = await fetch('geom/routes2.geojson');
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

    // Add 3D model
    map.addLayer(customLayer);


});

// Map inclination
//map.setPitch(30);