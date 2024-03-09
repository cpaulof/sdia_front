import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import drone_marker from "../assets/drone_marker.png"

import * as Keys from '../keys'

const containerStyle = {
  width: '550px',
  height: '350px'
};
const defaultMapOptions = {
    fullscreenControl: false,
    mapTypeId: "satellite",
    disableDefaultUI: true
  };

const center = {
  lat: -2.53697577046641,
  lng: -44.2792379196194
};

function MapView({pos, size}) {
  const [position, setPosition] = useState({lat:-2.53697577046641, lng:-44.2792379196194});
  const [marker, setMarker] = useState(null)
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: Keys.GOOGLE_MAPS_API_KEY
  })
  

  useEffect(()=>{
    setPosition(pos)
    if(map!=null) {
      map.setCenter(position)
      if(marker == null){
      
      setMarker(new window.google.maps.Marker({
        position: position,
        map,
        icon: drone_marker,
        title: "teste"}))
      }
      if(marker!=null) marker.setPosition(position)
    }
  }, [pos])

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
      
    
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        
        mapTypeId={window.google.maps.MapTypeId.SATELLITE}
        mapContainerStyle={size!=null?size:containerStyle}
        center={position}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultMapOptions}
      >
        { 
            
        }
        <></>
      </GoogleMap>
  ) : <></>
}
export default MapView
