/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/javascripts/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/javascripts/index.js":
/*!*************************************!*\
  !*** ./public/javascripts/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', () => {

  let points;

  mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbmVyaWM5NCIsImEiOiJjamwzdXZmZ2oyNTdsM3Bxa2puNHd6bndmIn0.WHqQdH1pCITDfoOot3AB-Q';
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/traneric94/cjl4g37s2an382rmrxko7kl33',
    center: [-122.388470,37.756866],
    zoom: 14,
  })

  let container = map.getCanvasContainer()
  let svg = d3.select(container).append("svg")


  function project(p) {
    return map.project(splitCoordinates(p));
  }

  function splitCoordinates(coordinates) {
    return new mapboxgl.LngLat(+coordinates.longitude, +coordinates.latitude)
  }

  // function subtractMinutes(date, minutes) {
  //   return new Date(date.getTime() - minutes*60000);
  // }
  //
  // let data = new Date();
  // let adjustedTime = subtractMinutes(data, 5)

  // let time = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
  
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
    })

    function render() {
      points.attr({
        cx: function(p) {return project(p).x},
        cy: function(p) {return project(p).y},
        r: function(p) {return p.available}
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


  $( "#time" ).change(function() {
    // alert( "Handler for .change() called." );
    // will render map with new data
  });


});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map