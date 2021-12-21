let myMap;

const init = () => {
myMap = new ymaps.Map("map", {
  center: [56.901592, 60.613736],
  zoom: 11,
  controls: []
});

const coords = [
[56.908728, 60.617581]
[56.834398, 60.625313]
[56.861047, 60.657507]
[56.872368, 60.554258]
];

const myCollection = new ymaps.GeoObjectCollection({}, {
  draggable: false,
  iconLayout: "default#image",
  iconImageHref: "/image/marker.svg",
  iconImageSize: [46, 57],
  iconImageOffset: [-35, -52]
})

coords.forEach(coord => {
  myCollection.add(new ymaps.Placemark(coord));
})

myMap.geoObjects.add(myCollection);
myMap.behaviors.disable("scrollZoom");
}

ymaps.ready(init);