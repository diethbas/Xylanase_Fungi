// google map API
let map, infoWindow;

async function initMap() {
    
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { Places } = await google.maps.importLibrary("places");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    mapId: "4504f8b37365c3d0",
  });

  //@ts-ignore
  const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement();

  const marker = new google.maps.marker.AdvancedMarkerElement ({map});
  const geocoder = new google.maps.Geocoder();


  const infoWindow = new InfoWindow();
  const draggableMarker = new AdvancedMarkerElement({
    map,
    position: { lat: 37.39094933041195, lng: -122.02503913145092 },
    gmpDraggable: true,
    title: "This marker is draggable.",
  });

  
  placeAutocomplete.id = "del-address";

  placeAutocomplete.addEventListener('gmp-placeselect', async ({ place }) => {
    await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location"],
      });
    draggableMarker.positionvg = place.location;
    draggableMarker.title = place.formattedAddress;
    cust.deladdress = place.formattedAddress;
    cust.pos = {
        lat: place.location.lat(),
        lng: place.location.lng()
    };
    map.setCenter(place.location);
  });

  draggableMarker.addListener("dragend", (event) => {
    const position = draggableMarker.position;

    infoWindow.close();
    infoWindow.setContent(`Pin dropped at: ${position.lat}, ${position.lng}`);
    infoWindow.open(draggableMarker.map, draggableMarker);
  });

  const card = document.getElementById("mapSearch");

  
  card.appendChild(placeAutocomplete);


  const quoteBtn = document.getElementById("quote");

  quoteBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          draggableMarker.position = pos;
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

window.initMap = initMap;

window.initMap();