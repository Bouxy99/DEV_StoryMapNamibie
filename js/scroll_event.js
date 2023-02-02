// Scroll event
let i = 0;
addEventListener("scroll", (event) => {
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
    updateDiv();
});

//Show map after scrolling
$(window).scroll(function () {
    d_top_map = $('#map').offset().top;
    console.log($(this).scrollTop()-d_top_map)
    if ((d_top_map - $(this).scrollTop()) <= 0) {
        $('#map').removeClass('map_abs');
        $('#map').addClass('map_fix');
    }
    else {
        $('#map').removeClass('map_fix');
        $('#map').addClass('map_abs');
    }
});

function updateDiv() {
    for (const [key, value] of Object.entries(div_dict)) {
        div = $("#" + key);
        // Get div position and size
        d_top = div.offset().top - window.scrollY;
        height = div.height();
        div_dict[key] = { "d_top": d_top, "height": height };

        // Find active div
        $("#" + key + "_card").removeClass('active_day');
        if (d_top <= (window.innerHeight / 2) && (d_top + height) >= (window.innerHeight / 2)) {
            active_div = key;
            $("#" + key + "_card").addClass('active_day');
        }
    };
};

updateDiv();
