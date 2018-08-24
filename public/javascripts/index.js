document.addEventListener('DOMContentLoaded', () => {

  let currentLat = -122.4014;
  let currentLon = 37.7990;
  let points;

    // document.getElementById("getLocation").addEventListener("click", function(e) {
    //   getCurrentLocation();
    // })

    function getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(coords)
      }
    };

    function coords(location) {
      currentLat = location.coords.latitude;
      currentLon = location.coords.longitude;
    }

  mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbmVyaWM5NCIsImEiOiJjamwzdXZmZ2oyNTdsM3Bxa2puNHd6bndmIn0.WHqQdH1pCITDfoOot3AB-Q';
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/traneric94/cjl4g37s2an382rmrxko7kl33',
    center: [currentLat, currentLon],
    zoom: 14
  })

  let container = map.getCanvasContainer()
  let svg = d3.select(container).append("svg").attr("class", "svgclass")

  function project(p) {
    return map.project(splitCoordinates(p));
  }

  function splitCoordinates(coordinates) {
    return new mapboxgl.LngLat(+coordinates.longitude, +coordinates.latitude)
  }

  function subtractMinutes(date, minutes) {
    return new Date(date.getTime() - minutes*60000);
  }

  function getTime() {
    let data = new Date();
    let adjustedTime = subtractMinutes(data, 5)
    let time = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
  }

  $.ajax({
    method: 'GET',
    url: '/query'
  }).then((data) => {
    points = svg.selectAll("circle.dot").data(data)

    points.enter().append("circle").classed("dot", true)
    .style({
      fill: "#4286f4",
      "fill-opacity": 0.6,
      stroke: "#004d60",
      "stroke-width": 1
    }).on("mouseover", function(d){

    d3.select(".svgclass").data([d])
      .append("text")
      .style("font-family", "sans-serif")
      .style("-webkit-text-fill-color", "white")
      .style("-webkit-text-stroke-width", "1px")
      .style("-webkit-text-stroke-color", "black")
      .attr("font-size", "15px")
      .attr("position", "absolute")
      .text(function (d) {return "Available bikes: " + d.available})
      .attr("x", function(d) {return project(d).x;})
      .attr("y", function(d) {return project(d).y;})
      .attr("text-anchor", "middle")

      d3.select(this)
      .attr("r", function(d) {return 65})

    }).on("mouseout", function(d) {

      svg.selectAll("text").remove()

      d3.select(this)
      .attr("r", function(d) {return d.available})
    })

    function render() {

      points.attr({
        cx: function(p) {return project(p).x},
        cy: function(p) {return project(p).y},
        r: function(p) {return p.available*2}
      })
    }

    map.on("viewreset", function() {
      render()
    })
    map.on("move", function() {
      render()
    })

    render()
  }).catch(err => console.log(err))

  // $( "#time" ).change(function() {
  //   // alert( "Handler for .change() called." );
  //   // will render map with new data
  // });

});
