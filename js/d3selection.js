function toBlack(selection) {
	selection
		.on('click', function(e, d) {
			selection.call(toBlack)
			d3.select(this)
				.call(toOrange)
		});
	selection.style('fill', 'black');
		
}

function toOrange(selection) {
	selection.style('fill', 'orange');
		
}


$(document).ready(function() {

    d3.selectAll('circle')
		.call(toBlack);

	let myData = [
		{
		  "name": "Andy",
		  "score": 37
		},
		{
		  "name": "Beth",
		  "score": 39
		},
		{
		  "name": "Craig",
		  "score": 31
		},
		{
		  "name": "Diane",
		  "score": 35
		},
		{
		  "name": "Evelyn",
		  "score": 38
		}
	  ];
	  
	  let barWidth = 400;
	  let barScale = d3.scaleLinear().domain([0, 100]).range([0, barWidth]);
	  
	  let u = d3.select('#wrapper')
		.selectAll('.person')
		.data(myData);
	  
	  let entering = u.enter()
		.append('div')
		.classed('person', true);
	  
	  entering.append('div')
		.classed('label', true)
		.text(function(d) {
		  return d.name;
		});
	  
	  entering.append('div')
		.classed('bar', true)
		.style('width', function(d) {
		  return barScale(d.score) + 'px';
		});
	  
	  function sort() {
		d3.selectAll('.person')
		  .sort(function(a, b) {
			return b.score - a.score;
		  });
	  }
		
	  d3.select('button')
		.on('click', sort);
	
		
	let scale = d3.scaleLinear().domain([0, 100]).range([0, 500]);
		
	let axis = d3.axisBottom(scale);
		
	d3.select('#text_axis')
		.call(axis);
	





		
	// set the dimensions and margins of the graph
	const margin = {top: 10, right: 30, bottom: 30, left: 50},
	width = 460 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3.select("#my_dataviz")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",`translate(${margin.left},${margin.top})`);

	//Read the data
	d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

	// When reading the csv, I must format variables:
	d => {
	return {
		date: d3.timeParse("%Y-%m-%d")(d.date),
		value : d.value
	}
	}).then(

	// Now I can use this dataset:
	function(data) {

	// Add X axis --> it is a date format
	const x = d3.scaleTime()
	.domain(d3.extent(data, d => d.date))
	.range([ 0, width ]);
	svg.append("g")
	.attr("transform", `translate(0,${height})`)
	.call(d3.axisBottom(x));

	// Add Y axis
	const y = d3.scaleLinear()
	.domain([0, d3.max(data, d => +d.value)])
	.range([ height, 0 ]);
	svg.append("g")
	.call(d3.axisLeft(y));

	// Add the area
	svg.append("path")
	.datum(data)
	.attr("fill", "#cce5df")
	.attr("stroke", "#69b3a2")
	.attr("stroke-width", 1.5)
	.attr("d", d3.area()
	.x(d => x(d.date))
	.y0(y(0))
	.y1(d => y(d.value))
	)
	})
}
)