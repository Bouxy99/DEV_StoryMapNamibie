// Scroll event
let i = 0;
let scroll_actu = 0;
let step_size = 6;
addEventListener("scroll", (event) => {
    map.setZoom(8);
    if (scroll_actu < window.scrollY) {
        if (i < coordinates.length) {
            for (let step = 0; step < step_size; step++) {
                data.features[0].geometry.coordinates.push(coordinates[i]);
                map.getSource('routes').setData(data);
                i++;
            }
        }
    } else {
        if (i > 0) {
            for (let step = 0; step < step_size; step++) {
                temp_coord = data.features[0].geometry.coordinates;
                temp_coord.pop();
                data.features[0].geometry.coordinates = temp_coord;
                map.getSource('routes').setData(data);
                i--;
            }
        }
    }
    map.panTo(coordinates[i]);
    scroll_actu = window.scrollY;
});