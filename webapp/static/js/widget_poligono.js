var lon = 5;
var lat = 40;
var zoom = 5;
var map, layer;

var bounds = new OpenLayers.Bounds(
-66.9101945258253, 10.4995727922997,
-66.8906349949867, 10.5153133026893
);
var options = {


    projection: "EPSG:4326"

    };

//*****************Controls*****************//
layer_switcher_control = new OpenLayers.Control.LayerSwitcher();
zoom_control = new OpenLayers.Control.PanZoomBar({ position: new OpenLayers.Pixel(15, 15) });
navigation_control = new OpenLayers.Control.Navigation();
mouse_position_control = new OpenLayers.Control.MousePosition();
overview_control = new OpenLayers.Control.OverviewMap();
keyboard_control = new OpenLayers.Control.KeyboardDefaults();

function onPopupClose(evt) {
    select_control.unselect(selectedFeature);
    }
function onFeatureSelect(feature) {
    selectedFeature = feature;
    popup = new OpenLayers.Popup.FramedCloud("chicken",
    feature.geometry.getBounds().getCenterLonLat(),
    null,
    "<div style='font-size:.8em'>Poligono: " + feature.id +"<br>Area: " + feature.geometry.getArea()+"</div>",
    null, true, onPopupClose);
    feature.popup = popup;
    map.addPopup(popup);
    }






function onFeatureUnselect(feature) {
    map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
    }

function init(){

    map = new OpenLayers.Map( 'map', options);
    var osm = new OpenLayers.Layer.OSM( "Mapa Open Street");
    map.addLayer(osm);
    map.setCenter(
    new OpenLayers.LonLat(-66.89968507 ,  10.50882052).transform(
    new OpenLayers.Projection("EPSG:4326"),
    map.getProjectionObject()
    ), 14
    )

    var poligonos_funvisis = new OpenLayers.Layer.Vector("Poligonos Funvisis", {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.WFS({
    url:  "http://127.0.0.1:8080/geoserver/wfs",
    featureType: "inspeccion_poligono",
    featureNS: "htttp://127.0.0.1:8080/geoserver/funvisis"
    })
});


map.addLayer(poligonos_funvisis);

select_control = new OpenLayers.Control.SelectFeature(
[poligonos_funvisis],
                {
                    click: true, toggle: false,
                    multiple: false, hover: false,
                    toggleKey: "ctrlKey", // ctrl key removes from selection
                    onSelect: onFeatureSelect,
                    onUnselect: onFeatureUnselect
                    }

);

drawControls = {
    polygon: new OpenLayers.Control.DrawFeature(poligonos_funvisis,
    OpenLayers.Handler.Polygon),
    select: select_control
    };

for(var key in drawControls) {
    map.addControl(drawControls[key]);
    }




//*****************Adding Controls To Map*****************//

map.addControl(layer_switcher_control);
map.addControl(navigation_control);
map.addControl(mouse_position_control);
map.addControl(keyboard_control);
map.addControl(select_control);

select_control.activate();




}
$(document).ready(function(){
    init();

    });

