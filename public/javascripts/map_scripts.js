
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9yeXExOCIsImEiOiJja3BxMnBmdTYwYWVxMndtb3FpNWgxYm14In0.GAZkE0ypvkCR0Pw5MuHxeg`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);

function onMapClick(e) {
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}

mymap.on('click', onMapClick);