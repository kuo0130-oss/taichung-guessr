const KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;


export function getStreetViewImage(
  lat,
  lng
) {

  const heading =
    Math.floor(
      Math.random() * 360
    );


  return `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${lat},${lng}&heading=${heading}&pitch=0&key=${KEY}`;

}