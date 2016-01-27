var root = 'http://localhost:3000';
var dataset;
var tab = new Array( );
var padding = 40;
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

$(document).ready(function () { 
    $.ajax({url: root + '/data_vis',method: 'GET', dataType: 'json' }).then(function(dataset) 
        { 
        for (var i = 0; i < 4; i++) 
        { tab[i] = (dataset[i].age);
        console.log(tab[i])
        };
        var svg = d3.select("#chart1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var x = d3.scale.linear()
        .domain([0,9])
        .range([0,width-20],0.1,0);

        var y = d3.scale.linear()
        .domain([0, (d3.max(tab))*1.1])
        .rangeRound([ height - padding, padding ]);

        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(d3.max(tab)); 
        
         svg.append("g")
        .attr("class", "x axis")
        .attr('transform', 'translate(20, ' + (height - margin.top ) + ')')
        .call(xAxis)
        .append("text")
        .style("text-anchor", "end")
        .attr('transform', 'translate(20,-340)')
        .text("name id");
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "end")
        .text("length");

        var bar = d3.select("svg")
        .selectAll("rect") 
        .data(tab)
        .enter()
        .append("rect")
        .attr("class", "bar")
               /*
                 .on('mouseover', function(d) {
                   d3.select(this)
                 .on('mouseout', function(d) {
                  d3.select(this)  })
    */
        .attr('transform', 'translate(40, 40)')
        .attr("y", function(d) { return y(d) ; }) 
        .attr("height", function(d) { return height - y(d) -40; })
        .attr("x", function(d, i) {
              return x(i)
           })
        .attr("width", 45)  
        .append("title")
        .text(function(d,i) {
        return "Le nombre de lettres pour l'id " + i + " , qui est l'identifiant de " + dataset[i].first_name  + ' ' +  dataset[i].last_name  +" , est " + d ;
        }) 
    })
});