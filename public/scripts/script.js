var map, currentLatitude, currentLongitude;
var markers = [],
  earth = 6378.137,
  pi = Math.PI,
  cos = Math.cos,
  meter = (1 / ((2 * pi / 360) * earth)) / 1000,
  circles = [],
  yOffset = 5,
  xOffset = 10,
  coords = [];

const BASE_URL = 'https://3908-113-11-180-16.ap.ngrok.io';
const AREA_ENDPOINT = `${BASE_URL}/api/area`;

function latitudePlusMeters(latitude, meters) {
  return latitude + (meters * meter);
}

function longitudePlusMeters(latitude, longitude, meters) {
  return longitude + (meters * meter) / cos(latitude * (pi / 180));
}

function checkPointInCircle(x1, y1, x2, y2, r) {
  r = (r / ((2 * pi / 360) * earth)) / 1000;
  const distPoints = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  r *= r;
  return distPoints < r;
}

async function init() {
  map = L
    .map('map', { zoomControl: false })
    .setView([currentLatitude, currentLongitude], 13);

  L
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .addTo(map);

  L
    .marker([currentLatitude, currentLongitude])
    .addTo(map);

  map
    .on('click', addMarker);
  // map.touchZoom.disable();
  // map.doubleClickZoom.disable();
  // map.scrollWheelZoom.disable();
  // map.boxZoom.disable();
  // map.keyboard.disable();
  const diff = 1400;
  for (let j = 0; j < xOffset; j += 1) {
    for (let i = 0; i < yOffset; i += 1) {
      coords.push({
        'latitude': latitudePlusMeters(currentLatitude, i * diff),
        'longitude': longitudePlusMeters(currentLatitude, currentLongitude, (j * diff)),
      });
      const rand = Math.random();
      const c1 = L.circle(
        [
          latitudePlusMeters(currentLatitude, i * diff),
          longitudePlusMeters(currentLatitude, currentLongitude, (j * diff)),
        ], {
          radius: 1000 - 8,
        }
      )
        .addTo(map)
        .bindTooltip(`${Number(rand*100000000).toFixed(0)}`, {
          permanent: true,
          direction: 'center'
        });

      c1
        .setStyle({
          color:'red',
          opacity: rand,
          stroke: false,
          fill: true,
          fillColor: 'red',
          fillOpacity: rand
        });
    }
    for (let i = 1; i < yOffset; i += 1) {
      coords.push({
        'latitude': latitudePlusMeters(currentLatitude, -(i * diff)),
        'longitude': longitudePlusMeters(currentLatitude, currentLongitude, (j * diff)),
      });
      const rand = Math.random();
      const c1 = L.circle(
        [
          latitudePlusMeters(currentLatitude, -(i * diff)),
          longitudePlusMeters(currentLatitude, currentLongitude, (j * diff)),
        ], {
          radius: 1000 - 8,
        }
      )
        .addTo(map)
        .bindTooltip(`${Number(rand*100000000).toFixed(0)}`, {
          permanent: true,
          direction: 'center'
        });

      c1
        .setStyle({
          color:'red',
          opacity: rand,
          stroke: false,
          fill: true,
          fillColor: 'red',
          fillOpacity: rand
        });
    }
  }
  for (let j = 1; j < xOffset; j += 1) {
    for (let i = 0; i < yOffset; i += 1) {
      coords.push({
        'latitude': latitudePlusMeters(currentLatitude, i * diff),
        'longitude': longitudePlusMeters(currentLatitude, currentLongitude, -(j * diff)),
      });
      const rand = Math.random();
      const c1 = L.circle(
        [
          latitudePlusMeters(currentLatitude, i * diff),
          longitudePlusMeters(currentLatitude, currentLongitude, -(j * diff)),
        ], {
          radius: 1000 - 8,
        }
      )
        .addTo(map)
        .bindTooltip(`${Number(rand*100000000).toFixed(0)}`, {
          permanent: true,
          direction: 'center'
        });

      c1.setStyle({
        color:'red',
        opacity: rand,
        stroke: false,
        fill: true,
        fillColor: 'red',
        fillOpacity: rand
      });
    }
    for (let i = 1; i < yOffset; i += 1) {
      coords.push({
        'latitude': latitudePlusMeters(currentLatitude, -(i * diff)),
        'longitude': longitudePlusMeters(currentLatitude, currentLongitude, -(j * diff)),
      });
      const rand = Math.random();
      const c1 = L.circle(
        [
          latitudePlusMeters(currentLatitude, -(i * diff)),
          longitudePlusMeters(currentLatitude, currentLongitude, -(j * diff)),
        ], {
          radius: 1000 - 8,
        }
      )
        .addTo(map)
        .bindTooltip(`${Number(rand*100000000).toFixed(0)}`, {
          permanent: true,
          direction: 'center'
        });

      c1.setStyle({
        color:'red',
        opacity: rand,
        stroke: false,
        fill: true,
        fillColor: 'red',
        fillOpacity: rand
      });
    }
  }
  console.log(coords.length);
  // const { data } = await fetch(AREA_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     coords: [...coords],
  //   }),
  // })
  //   .then(async (res) => await res.json());
  // console.log(data);
  // data.forEach(({ average, center }) => {
  //   if (average !== 0) {
  //     const ordinal = determineRange(average);
  //     const c1 = L.circle(
  //       [
  //         center.latitude,
  //         center.longitude,
  //       ], {
  //         radius: 1000 - 8,
  //       }
  //     )
  //       .addTo(map)
  //       .bindTooltip(`${average}`, { permanent: true, direction: 'center' });;
  //     c1.setStyle({ color: ordinal.color, opacity: 1, stroke: false, fill: true, fillColor: ordinal.color, fillOpacity: 1 });
  //   }
  // });
  // console.log(Math.max(...data.map((d) => d.average)));
  // const c1 = L.circle(
  //   [
  //     currentLatitude,
  //     currentLongitude,
  //   ], {
  //     radius: 1000 - 8,
  //   }
  // )
  //   .addTo(map);
  // c1.setStyle({ color:'red', opacity: 0.1 });
}

function determineRange(price) {
  const ordinal = [
    {
      l: 0,
      g: 700000000,
      opacity: 0.4,
      color: '#fad4d4',
    },
    {
      l: 700000000,
      g: 1000000000,
      opacity: 0.5,
      color: '#f78686',
    },
    {
      l: 1000000000,
      g: 1700000000,
      opacity: 0.6,
      color: '#fa5c5c',
    },
    {
      l: 1700000000,
      g: 2400000000,
      opacity: 0.7,
      color: '#f21f1f',
    },
    {
      l: 2400000000,
      g: 3500000000,
      opacity: 0.8,
      color: '#c90202',
    },
    {
      l: 3500000000,
      g: 10000000000,
      opacity: 0.9,
      color: '#380101',
    },
  ];

  let result = 0;
  for(let i = ordinal.length - 1; i >= 0; i -= 1) {
    if (price >= ordinal[i].l) {
      result = i;
      break;
    }
  }

  return ordinal[result];
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLatitude = position.coords.latitude;
      currentLongitude = position.coords.longitude;
      init();
    });
  } else {
    alert('Geolocation not supported');
  }
}

function addMarker(e) {
  if (markers.length > 0) {
    markers[0].remove();
    markers = [];
  }
  const newMarker = new L.Marker([e.latlng.lat,e.latlng.lng]);
  newMarker.addTo(map);
  markers.push(newMarker);
  alert(checkPointInCircle(currentLatitude, currentLongitude, e.latlng.lat, e.latlng.lng, 1000));
}

getCurrentLocation();
