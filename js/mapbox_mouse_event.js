// Action on layer click
map.on('click', '360', (e) => {
    url_img = e.features[0].properties.url;
    rotation = e.features[0].properties.rotation;
    $("#img_360").attr('src', `360_img.html?url_img=${url_img}&rotation=${rotation}`);
    $("#img_360").show();
});

// Change the cursor to a pointer when the mouse is over a layer.
map.on('mouseenter', '360', () => {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', '360', () => {
    map.getCanvas().style.cursor = '';
});