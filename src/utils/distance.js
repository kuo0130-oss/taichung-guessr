export function calculateDistance(
  lat1,
  lng1,
  lat2,
  lng2
) {

  const R = 6371;


  const dLat =
    (lat2 - lat1) *
    Math.PI /
    180;


  const dLng =
    (lng2 - lng1) *
    Math.PI /
    180;


  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +

    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *

    Math.sin(dLng / 2) *
      Math.sin(dLng / 2);



  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );


  return R * c * 1000;

}export function calculateScore(distance){

  if(distance < 50){

    return 1000;

  }


  if(distance < 100){

    return 900;

  }


  if(distance < 300){

    return 800;

  }


  if(distance < 500){

    return 700;

  }


  if(distance < 1000){

    return 500;

  }


  if(distance < 3000){

    return 300;

  }


  return 100;

}