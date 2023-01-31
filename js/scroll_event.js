// Scroll event
let i = 0;
addEventListener("scroll", (event) => {
    if (i < coordinates.length) {
        data.features[0].geometry.coordinates.push(coordinates[i]);
        map.getSource('routes').setData(data);
        console.log(coordinates[i])
        map.panTo(coordinates[i]);
        i++;
    }
});