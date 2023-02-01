// Scroll event
let i = 0;
let scroll_actu = 0;
let step_size = 3;
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

div_dict = {
    "day1": {},
    "day2": {},
    "day3": {},
    "day4": {},
    "day5": {},
    "day6": {},
    "day7": {},
    "day8": {},
    "day9": {},
    "day10": {},
    "day11": {},
    "day12": {},
    "day13": {},
    "day14": {},
    "day15": {},
    "day16": {},
    "day17": {},
    "day18": {},
    "day19": {},
    "day20": {},
    "day21": {},
    "day22": {}
};

function updateDiv() {
    for (const [key, value] of Object.entries(div_dict)) {
        div = $("#" + key);
        // Get div position and size
        d_top = div.offset().top - window.scrollY;
        height = div.height();
        div_dict[key] = { "d_top": d_top, "height": height };

        // Find active div
        $("#" + key + "_card").removeClass('active_day');
        if (d_top <= (window.innerHeight/2) && (d_top+height) >= (window.innerHeight/2)) {
            active_div = key;
            $("#" + key + "_card").addClass('active_day');
        }
    };
};

updateDiv();
