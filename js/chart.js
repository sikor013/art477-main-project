// Create datasets

const total_fatal_crashes = [
	{ser1: 2013, ser2: 491},
	{ser1: 2014, ser2: 451},
	{ser1: 2015, ser2: 513},
	{ser1: 2016, ser2: 524},
	{ser1: 2017, ser2: 539},
	{ser1: 2018, ser2: 517},
	{ser1: 2019, ser2: 511},
	{ser1: 2020, ser2: 540},
	{ser1: 2021, ser2: 546},
	{ser1: 2022, ser2: 547},
	{ser1: 2023, ser2: 512}
];

const alcohol_related_crashes = [
	{ser1: 2013, ser2: 4954},
	{ser1: 2014, ser2: 4932},
	{ser1: 2015, ser2: 5174},
	{ser1: 2016, ser2: 5153},
	{ser1: 2017, ser2: 6151},
	{ser1: 2018, ser2: 6255},
	{ser1: 2019, ser2: 6058},
	{ser1: 2020, ser2: 6050},
	{ser1: 2021, ser2: 6368},
	{ser1: 2022, ser2: 6230},
	{ser1: 2023, ser2: 5976}
];

const drug_related_crashes = [
	{ser1: 2013, ser2: 718},
	{ser1: 2014, ser2: 670},
	{ser1: 2015, ser2: 815},
	{ser1: 2016, ser2: 762},
	{ser1: 2017, ser2: 1746},
	{ser1: 2018, ser2: 1724},
	{ser1: 2019, ser2: 1749},
	{ser1: 2020, ser2: 2250},
	{ser1: 2021, ser2: 2094},
	{ser1: 2022, ser2: 1821},
	{ser1: 2023, ser2: 1725}
];

const speeding_related_crashes = [
	{ser1: 2013, ser2: 21290},
	{ser1: 2014, ser2: 20887},
	{ser1: 2015, ser2: 17811},
	{ser1: 2016, ser2: 19540},
	{ser1: 2017, ser2: 19182},
	{ser1: 2018, ser2: 20061},
	{ser1: 2019, ser2: 21813},
	{ser1: 2020, ser2: 15995},
	{ser1: 2021, ser2: 17597},
	{ser1: 2022, ser2: 17895},
	{ser1: 2023, ser2: 16403}
];

const hit_and_run_related_crashes = [
	{ser1: 2013, ser2: 12045},
	{ser1: 2014, ser2: 12360},
	{ser1: 2015, ser2: 13559},
	{ser1: 2016, ser2: 14658},
	{ser1: 2017, ser2: 18646},
	{ser1: 2018, ser2: 19518},
	{ser1: 2019, ser2: 19778},
	{ser1: 2020, ser2: 18480},
	{ser1: 2021, ser2: 21377},
	{ser1: 2022, ser2: 20303},
	{ser1: 2023, ser2: 19252}
];

const motorcycle_crashes = [
	{ser1: 2013, ser2: 2150},
	{ser1: 2014, ser2: 2101},
	{ser1: 2015, ser2: 2221},
	{ser1: 2016, ser2: 2250},
	{ser1: 2017, ser2: 2206},
	{ser1: 2018, ser2: 1967},
	{ser1: 2019, ser2: 1806},
	{ser1: 2020, ser2: 2104},
	{ser1: 2021, ser2: 2082},
	{ser1: 2022, ser2: 1921},
	{ser1: 2023, ser2: 1949}
];

const pedestrian_crashes = [
	{ser1: 2013, ser2: 1273},
	{ser1: 2014, ser2: 1183},
	{ser1: 2015, ser2: 1289},
	{ser1: 2016, ser2: 1252},
	{ser1: 2017, ser2: 1533},
	{ser1: 2018, ser2: 1505},
	{ser1: 2019, ser2: 1460},
	{ser1: 2020, ser2: 1137},
	{ser1: 2021, ser2: 1273},
	{ser1: 2022, ser2: 1324},
	{ser1: 2023, ser2: 1299}
];

const bicycle_crashes = [
	{ser1: 2013, ser2: 958},
	{ser1: 2014, ser2: 925},
	{ser1: 2015, ser2: 987},
	{ser1: 2016, ser2: 918},
	{ser1: 2017, ser2: 906},
	{ser1: 2018, ser2: 852},
	{ser1: 2019, ser2: 759},
	{ser1: 2020, ser2: 619},
	{ser1: 2021, ser2: 691},
	{ser1: 2022, ser2: 668},
	{ser1: 2023, ser2: 791}
];

const ids = ["Fatal", "Alcohol-Related", "Drug-Related", "Speeding-Related", "Hit-and-Run", "Motorcycle", "Pedestrian", "Bicycle"];

function getWidth() {
	return document.getElementById("D3_container").clientWidth - margin.left - margin.right - 100;
}

function getHeight() {
	return 350
}

const margin = {top: 10, right: 30, bottom: 30, left: 50}

var x = null
var y = null
var xAxis = null
var yAxis = null
var y_axis_text = null
var svg = null

// Create a function that takes a dataset as input and update the plot:
function update(data, name) {

	if (x == null) {
		return
	}

	document.getElementById("chart_subtitle").textContent = name.concat(" Crashes");

	// Create the X axis:
	x.domain([d3.min(data, function(d) {return d.ser1}), d3.max(data, function(d) { return d.ser1 }) ]);
	svg.selectAll(".myXaxis").transition()
	.duration(500)
	.call(xAxis);

	// create the Y axis
	y.domain([0, d3.max(data, function(d) { return d.ser2  }) * 1.5 ]);
	svg.selectAll(".myYaxis")
	.transition()
	.duration(500)
	.call(yAxis);

	// Create a update selection: bind to the new data
	var u = svg.selectAll(".lineTest")
	.data([data], function(d){ return d.ser1 });

	// Update the line
	u
	.join("path")
	.attr("class","lineTest")
	.transition()
	.duration(500)
	.attr("d", d3.area()
		.x(function(d) { return x(d.ser1); })
		.y(function(d) { return y(d.ser2); }))
		.attr("fill", "red")
		.attr("stroke", "red")
		.attr("stroke-width", 2.5)
	
	y_axis_text.text("Number of "+name+" Crashes");

	for (let i = 0; i < ids.length; i++) {
		var button = document.getElementById(ids[i]);
		if (button != null) {
			if (ids[i] == name) {
				button.style.backgroundColor = "Red"
				button.style.backgroundImage = "url(images/".concat(ids[i]).concat("_Selected.png)")
			} else {
				button.style.backgroundColor = "Black"
				button.style.backgroundImage = "url(images/".concat(ids[i]).concat("_Unselected.png)")
			}
		}
		
	}
}

$(document).ready(function() {

	for (let i = 0; i < ids.length; i++) {
		var button = document.getElementById(ids[i]);
		$("#"+ids[i]).tooltip({});
	};

	// append the svg object to the body of the page
	svg = d3.select("#my_dataviz")
	.append("svg")
		.attr("width", getWidth() + margin.left + margin.right)
		.attr("height", getHeight() + margin.top + margin.bottom)
		.attr("overflow", "visible")
	.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);
	svg.append("text")
		.attr("fill", "white")
		.attr("x", getWidth() / 2 )
		.attr("y", getHeight() + 40 )
		.style("text-anchor", "middle")
		.text("Year");
	
	y_axis_text = svg.append("text")
		.attr("fill", "white")
		.attr("text-anchor", "middle")
		.attr("x", getHeight() / 2)
		.attr("y", 50)
		.attr("dy", ".75em")
		.attr("transform", "rotate(-270)")
		.text("Number of X Crashes");

	// Initialise a X axis:
	x = d3.scaleLinear().range([0,getWidth()]);
	xAxis = d3.axisBottom().scale(x).tickFormat(d3.format("d"));
	svg.append("g")
	.attr("transform", `translate(0, ${getHeight()})`)
	.attr("class","myXaxis")

	// Initialize an Y axis
	y = d3.scaleLinear().range([getHeight(), 0]);
	yAxis = d3.axisLeft().scale(y);
	svg.append("g")
	.attr("class","myYaxis")

	update(total_fatal_crashes, "Fatal");
});



