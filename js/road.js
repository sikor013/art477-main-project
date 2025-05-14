const LINE_LENGTH = 50
const CAR_SPEED = 10
const CAR_INTERVAL = 750

function create_dash() {
	var road = document.getElementById('road');
	var div = document.createElement(div);
	div.classList.add("line_dash");
	div.style.height = LINE_LENGTH.toString().concat("px");
	div.style.marginBottom = LINE_LENGTH.toString().concat("px");
	road.appendChild(div);
}

function load_dashes() {
	var road = document.getElementById('road');
	var clientHeight = road.clientHeight + 50;
	while (clientHeight > 0) {
		create_dash(road);
		clientHeight = clientHeight - (LINE_LENGTH * 2);
	}
}

function spawn_car() {
	var road = document.getElementById('road');
	var div = document.createElement(div);

	// Direction
	var direction_roll = Math.random() * 2
	if (Math.floor(direction_roll) == 0) {
		div.classList.add("start_top");
	} else {
		div.classList.add("start_bottom");
	}
	div.style.animationDuration = CAR_SPEED.toString().concat("s")

	// Vehicle Type
	var truck_roll = Math.random() * 5
	var is_truck = (Math.floor(truck_roll) == 0)
	if (is_truck) {
		div.classList.add("truck");
	} else {
		div.classList.add("car");
	}

	// Vehicle Color
	var img_string = "images/";
	if (is_truck) {
		img_string = img_string.concat("truck_");
	} else {
		img_string = img_string.concat("car_");
	}
	var color_roll = Math.random() * 967 / 10;
	if (color_roll < 25.8) {
		img_string = img_string.concat("white");
	} else if (color_roll < 48.1) {
		img_string = img_string.concat("black");
	} else if (color_roll < 78.6) {
		img_string = img_string.concat("silver");
	} else if (color_roll < 88.1) {
		img_string = img_string.concat("blue");
	} else {
		img_string = img_string.concat("red");
	}

	div.style.backgroundImage = "url(".concat(img_string).concat(".png)")

	
	road.appendChild(div)
	setTimeout(function() { div.remove() }, CAR_SPEED * 1000);
}

function start_car_spawning() {
	var interval = CAR_INTERVAL
	var offset = Math.random(1) + 0.5
	spawn_car()
	setTimeout(function() {start_car_spawning() }, CAR_INTERVAL * offset);
}