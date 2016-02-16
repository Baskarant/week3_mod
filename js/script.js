
    d3.json("/Project3/data/popData.json",function(error,data){
      if(error)
       return console.warn(error);
       //console.log(data);
       createChart(data);
    });
    
function createChart(data) {
  //var xColumn="Country Name";
    //var yColumn="Population (Millions) - 2013"
    var chart,
        bars,
        margin = 100,
        w = 8,
        h = 500,
        x, y,
        xAxis, yAxis;
        //data = JSON.parse(data);
    //console.log(data);
    data.sort(function(a,b){
      return b.population-a.population;
    });

    chart = d3.select( 'body' ).append( 'svg' )
        .attr( 'class', 'chart' )
        .attr( 'width', 1800 )
        .attr( 'height', h )
        .append('g');

    d3.select('svg g')
        .attr('transform', 'translate(50, 50)');

    x = d3.scale.ordinal()
        .rangeRoundBands( [0, w * 210] )

    x.domain(data.map(function(d) {
      return d.country;
    }));

    y = d3.scale.linear()
        .domain( [0,2000] )
        .rangeRound( [0, h - margin] );

    // Bars
    bars = chart.append('g')
        .attr('class', 'bars');

    bars.selectAll( 'rect' )
        .data( data )
      .enter().append( 'rect' )
        .attr( 'x', function( d, i ) { return x( d.country ) + 88; } )
        .attr( 'y', function( d ) { return (h - margin) - y( d.population ) + .5 } )
        .attr( 'width', w )
        .attr( 'height', function( d ) { return y( d.population ) } )
        .append('g');

    // Axis
    xAxis = d3.svg.axis()
        .scale(x)
        .ticks(20)
        .tickSize(6, 3, 1);

    yAxis = d3.svg.axis()
        .scale(d3.scale.linear().domain( [0, d3.max( data, function( d ) { return d.population; } )] ).rangeRound( [h - margin, 0] ))
        .tickSize(6, 3, 1)
        .orient('left');

    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(60, ' + (h - margin) + ')')
        .call(xAxis);

    chart.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + x.range()[1] + ')')
        .call(yAxis);
}
