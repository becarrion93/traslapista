/**
 * Creates a new marker and adds it to a group
 * @param {H.map.Group} group       The group holding the new marker
 * @param {H.geo.Point} coordinate  The location of the marker
 * @param {String} html             Data associated with the marker
 */
function addMarkerToGroup(group, coordinate, html) {
  var marker = new H.map.Marker(coordinate);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

/**
 * Add two markers showing the position of Liverpool and Manchester City football clubs.
 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
function addInfoBubble(map) {
  var group = new H.map.Group();

  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);
  }, false);

  addMarkerToGroup(group, {lat:40.4651576, lng:-3.6115241},
    '<div><a href="http://www.mcfc.co.uk" target="_blank">Parque Juan Carlos I</a>' +
    '</div><div >No sé muy bien qué contar aquí</div>');

  addMarkerToGroup(group, {lat:40.393789, lng:-3.682165},
    '<div><a href="http://www.liverpoolfc.tv" target="_blank">Liverpool</a>' +
    '</div><div >Planetario<br>Capacity: 45,362</div>');

}

function switchMapLanguage(map, platform){
  // Create default layers
  let defaultLayers = platform.createDefaultLayers({
    lg: 'spa'
  });
  // Set the normal map variant of the vector map type
  map.setBaseLayer(defaultLayers.vector.normal.map);

  // Display default UI components on the map and change default
  // language to simplified Chinese.
  // Besides supported language codes you can also specify your custom translation
  // using H.ui.i18n.Localization.
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  // Remove not needed settings control
  ui.removeControl('mapsettings');
}




/**
 * Boilerplate map initialization code starts below:
 */

// initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey : 'zqKe607ZT5lAW9JeWMNe'
var platform = new H.service.Platform({
  apikey: 'zqKe607ZT5lAW9JeWMNe'
});
var defaultLayers = platform.createDefaultLayers();

// initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:40.4, lng: -3.6833},
  zoom: 10,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// create default UI with layers provided by the platform
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
addInfoBubble(map);

// Now use the map as required...
switchMapLanguage(map, platform);