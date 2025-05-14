var isOpen = false
var map = null
var default_location = 3
var selected_location = default_location

const descriptions = [
	"The most populous city in Wisconsin, Milwaukee has been recently adopting new strategies to address a spike in reckless driving accidents.",
	"A small town with a population of 5,152, Union Grove has committed to new plans regarding their high school’s parking lot.",
	"A city known for its educational centers from universities to dinosaur museums, Kenosha has recently undergone an extreme speed limit change on one of its most iconic highways.",
	"Select a location to get started."
]

const links = ["milwaukee.html", "union_grove.html", "kenosha.html", "index.html"]

const names = ["MILWAUKEE", "UNION GROVE", "KENOSHA", "NO LOCATION"]

const preview_images = ["url('images/preview_milwaukee.png')", "url('images/preview_union_grove.png')", "url('images/preview_kenosha.png')", "none"]

function set_default_location(id) {
	default_location = id;
}

function unload_icons() {
	var pulses = document.getElementsByClassName("pulse")
	var map_text = document.getElementsByClassName("map_text")
	var map_icons = document.getElementsByClassName("map_icon");
	for (let i = 0; i < map_icons.length; i++) {
		map_icons[i].style.opacity = 0;
	}
	for (let i = 0; i < map_text.length; i++) {
		map_text[i].style.opacity = 0;
	}
	while (pulses.length > 0) {
		pulses[0].remove()
	}
}

function load_icons() {
	var map_icons = document.getElementsByClassName("map_icon");
	var map_text = document.getElementsByClassName("map_text")
	for (let i = 0; i < map_icons.length; i++) {
		map_icons[i].style.opacity = 1;
		var pulse = document.createElement("div");
		pulse.classList.add("pulse");
		map_icons[i].appendChild(pulse);
		pulse.style.backgroundColor = map_icons[i].style.backgroundColor;
	}
	for (let i = 0; i < map_text.length; i++) {
		map_text[i].style.opacity = 1;
	}
	
}

function update_selected() {
	var pulses = document.getElementsByClassName("pulse");
	var map_icons = document.getElementsByClassName("map_icon");
	for (let i = 0; i < 3; i++) {
		if (i != selected_location) {
			map_icons[i].style.backgroundColor = "red";
			if (pulses[i] != null) {
				pulses[i].style.backgroundColor = "red";
			}
		} else {
			map_icons[i].style.backgroundColor = "turquoise";
			if (pulses[i] != null) {
				pulses[i].style.backgroundColor = "turquoise";
			}
		}
	}
	document.getElementsByClassName("location_description")[0].innerHTML = descriptions[selected_location];
	document.getElementsByClassName("location_name")[0].innerHTML = names[selected_location];
	document.getElementsByClassName("preview_image")[0].style.backgroundImage = preview_images[selected_location];

	var go_button = document.getElementsByClassName("go_button")[0]
	if (selected_location >= 3) {
		go_button.style.display = "none";
	} else {
		go_button.style.display = "block";
	}
	go_button.setAttribute("href", links[selected_location])

}

function reset_selection() {
	selected_location = "3"
	update_selected();
}

function MKE_selected() {
	selected_location = "0"
	update_selected();
}

function UG_selected() {
	selected_location = "1"
	update_selected();
}

function KSA_selected() {
	selected_location = "2"
	update_selected();
}

function load_map() {
	
	map = document.getElementById('map');
	left_page = document.getElementById('left_page');
	right_page = document.getElementById('right_page');
	marker = document.getElementById('marker');
	x_button = document.getElementById('close_button');
	map_icons = document.getElementsByClassName("map_icon");
	navigation_container = document.getElementsByClassName("navigation_container");
	map.addEventListener("click", (event) => {
		if (isOpen == false && x_button.matches(':hover') == false) {
			maximizeMap();
			isOpen = true;
			marker.style.opacity = 0;
			left_page.classList.add("open_left_page");
			right_page.classList.add("open_right_page");
			load_icons();
			selected_location = default_location;
			update_selected();
			navigation_container[0].style.opacity = 1;
		}
	});
	x_button.addEventListener("click", (event) => {
		if (isOpen) {
			minimizeMap();
			marker.style.opacity = 1;
			left_page.classList.remove("open_left_page");
			right_page.classList.remove("open_right_page");
			unload_icons();
			isOpen = false;
			navigation_container[0].style.opacity = 0;
		}
	});
	map.addEventListener("mouseenter", (event) => {
		if (isOpen == false) {
			map.classList.add("hover_map");
			left_page.classList.add("hover_left_page");
			right_page.classList.add("hover_right_page");
		}
	});
	map.addEventListener("mouseleave", (event) => {
		if (isOpen == false) {
			map.classList.remove("hover_map");
			left_page.classList.remove("hover_left_page");
			right_page.classList.remove("hover_right_page");
		}
	});
	map_icons[0].addEventListener("click", (event) => {
		if (selected_location != 0) {
			MKE_selected();
		} else {
			reset_selection();
		}

	});
	map_icons[1].addEventListener("click", (event) => {
		if (selected_location != 1) {
			UG_selected();
		} else {
			reset_selection();
		}
	});
	map_icons[2].addEventListener("click", (event) => {
		if (selected_location != 2) {
			KSA_selected();
		} else {
			reset_selection();
		}
	});
}

function minimizeMap() {
	map.classList.remove("big_map");
}

function maximizeMap() {
	map.classList.add("big_map");
}