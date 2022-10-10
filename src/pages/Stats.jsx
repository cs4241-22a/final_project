import React from 'react'
import * as d3 from 'd3'
//import * as d3Collection from 'd3-collection'


const Stats = () => {
  var w = 500, h = 500, m = 50, r = Math.min(w,h) / 2 - m
  // var stockfish_data = { wins: 200, losses: 50, draws: 25 };
  var stockfish_data = [{"label":"wins", "value":200,}, {"label":"losses", "value":50,}, {"label":"draws", "value":25,}];
  // var leela_data = { wins: 100, losses: 100, draws: 75 };
  var leela_data = [{"label":"wins", "value":100,}, {"label":"losses", "value":100,}, {"label":"draws", "value":75,}];
  // var komodo_data = { wins: 150, losses: 105, draws: 20 };
  var komodo_data = [{"label":"wins", "value":150,}, {"label":"losses", "value":105,}, {"label":"draws", "value":20,}];
  var stockfish_played = 275
  var leela_played = 275;
  var komodo_played = 275;
  var color = d3.scaleOrdinal()
    .domain(["wins", "losses", "draws"])
    .range(["#23A122", "#D9241E", "#7F7F7F"])
  function changeto(data)
  {
    d3.select("#piechart").selectAll("*").remove();
    var svg = d3.select("#piechart")
      .append("svg")
        .data([data])
        .attr("width", w)
        .attr("height", h)
      .append("g")
        .attr("transform","translate(" + r + "," + r + ")" );
    var pie = d3.pie();
    var arc = d3.arc().innerRadius(0).outerRadius(r);
    var arcs = svg.selectAll("g.slice")
      .data( pie( data ) )
      .enter()
      .append("g")
        .attr("class", "slice");
    arcs.append("path")
        .attr("fill", function(d) { return( color( d.data.key ) ); } )
        .attr("d", function(d) { return arc(d); } );
    arcs.append("text")
        .attr("transform", function(d)
          {
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";
          })
        .attr("text-anchor", "middle")
        .text( function(d, i) { return data[i].label; } );
  }
  changeto(stockfish_data)
  return (
    <div>
      <script src="https://d3js.org/d3.v4.js"></script>
      <h1>Stats for "user"</h1>
      <p>Gather stats from games played</p>
      <button id="stockfishdata" onClick={ function(e) { changeto(stockfish_data) } }>Stockfish</button>
      <button id="leeladata" onClick={ function(e) { changeto(leela_data) } }>Leela</button>
      <button id="komododata" onClick={ function(e) { changeto(komodo_data) } }>Komodo</button>
      <div id="piechart"></div>
      {/*<p>Pie chart for all games, wins/loss/draws</p>
      <p>Pie chart for games vs Stockfish, wins/loss/draws</p>
      <p>Pie chart for games vs Leela, wins/loss/draws</p>
      <p>Pie chart for games vs Komodo, wins/loss/draws</p>
      <p>Maybe some cool opening data since we are saving the PGNs of games</p>*/}
    </div>
  )
}

export default Stats

/*
    d3.select("#piechart").selectAll("*").remove();
    var svg = d3.select("#piechart")
      .append("svg")
        .attr("width", w)
        .attr("height", h)
      .append("g")
        .attr("transform","translate(" + w / 2 + "," + h / 2 + ")");
    var pie = d3.pie()
      .value( function(d) { return d.value; } )
      .sort( function(a,b) { return d3.ascending(a.key, b.key); } )
    var data_fr = pie( d3Collection.entries(data) )
    var u = svg.selectAll("path").data(data_fr)
    u.enter()
      .append("path")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("d", d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr("fill", function(d) { return( color(d.data.key) ) } )
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 1)
    u.exit().remove() */