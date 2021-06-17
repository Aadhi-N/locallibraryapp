const locations = [
    ["Narnia Library Branch #1", 43.6532, -79.3832],
    ["Narnia Library Branch #2", 43.7, -79.4],
];

var mymap = L.map('mapid').setView([43.6532, -79.3832], 13);

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG9yeXExOCIsImEiOiJja3BxMnBmdTYwYWVxMndtb3FpNWgxYm14In0.GAZkE0ypvkCR0Pw5MuHxeg`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 12,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);


for (var i = 0; i < locations.length; i++) {
    marker = new L.marker([locations[i][1], locations[i][2]])
      .bindPopup(locations[i][0])
      .addTo(mymap);
}
