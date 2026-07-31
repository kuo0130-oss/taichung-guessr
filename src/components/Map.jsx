import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents
} from "react-leaflet";

import { useState } from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25,41],

  iconAnchor: [12,41]

});

function LocationMarker({ setGuessPosition }) {

  useMapEvents({

    click(e) {

      setGuessPosition(e.latlng);

    }

  });


  return null;

}



function Map({ 
  setGuessPosition,
  guessPosition,
  answerPosition
}) {

console.log("answerPosition:", answerPosition);

  const [position, setPosition] = useState(null);


  function handleClick(latlng){

    setPosition(latlng);

    setGuessPosition(latlng);

  }


  return (

    <div className="h-[500px] w-full">


      <MapContainer

        center={[24.1477,120.6736]}

        zoom={13}

        style={{
          height:"100%",
          width:"100%"
        }}

      >


        <TileLayer

          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

        />


        <LocationMarker 
          setGuessPosition={handleClick}
        />


        {
          position &&
          <Marker 
  position={position}
  icon={markerIcon}
/>
        }
        {
  answerPosition &&
 <Marker 
  position={answerPosition}
  icon={markerIcon}
/>
}


{
  position &&
  answerPosition && (

    <Polyline

      positions={[
        position,
        answerPosition
      ]}

    />

  )
}


      </MapContainer>


    </div>

  )

}


export default Map;