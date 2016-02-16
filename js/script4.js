d3.json("data/4b.json",function(error,data){
  if(error)
   return console.warn(error);
   //console.log(data);
   createChart(data);
});

function createChart(data) {
/* data.sort(function(a,b){
    return b.population-a.population;
  }); */
  var margin = {top: 20, right: 20, bottom: 70, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
  var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

  var y = d3.scale.linear().range([height, 0]);
  // define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(12);

// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right + 150)
    .attr("height", height + margin.top + margin.bottom + 150)
  .append("g")
    .attr("transform",
          "translate(" + margin.left  + "," + margin.top + ")");

 // scale the range of the data
  x.domain(data.map(function(d) { return d.continent; }));
  y.domain([0, d3.max(data, function(d) { return d.population; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population");

      svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.continent); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.population); })
      .attr("height", function(d) { return height - y(d.population); });

}
