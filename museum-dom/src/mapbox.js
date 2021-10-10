	mapboxgl.accessToken = 'pk.eyJ1Ijoid2luZG96IiwiYSI6ImNrdWsxNnJkczBwOGUyb3A2ZW1raXBiMmEifQ.oWxGD6HFKmuFtd37UvX0tQ';
const marker1 = [2.3364, 48.86091],
  marker2 = [2.3333, 48.8602],
  marker3 = [2.3397, 48.8607],
  marker4 = [2.3330, 48.8619],
  marker5 = [2.3365, 48.8625];
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: marker1,
zoom: 16
});

const el1 = document.createElement('div');
el1.id = 'marker';
el1.classList.add('marker');
const el2 = document.createElement('div');
el2.classList.add('marker');
const el3 = document.createElement('div');
el3.classList.add('marker');
const el4 = document.createElement('div');
el4.classList.add('marker');
const el5 = document.createElement('div');
el5.classList.add('marker');
 
// create the marker
new mapboxgl.Marker(el1)
.setLngLat(marker1)
.addTo(map);

new mapboxgl.Marker(el2)
.setLngLat(marker2)
.addTo(map);

new mapboxgl.Marker(el3)
.setLngLat(marker3)
.addTo(map);

new mapboxgl.Marker(el4)
.setLngLat(marker4)
.addTo(map);

new mapboxgl.Marker(el5)
.setLngLat(marker5)
.addTo(map);

map.addControl(new mapboxgl.NavigationControl());