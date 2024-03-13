import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import drone_marker from "../assets/drone_mark.svg"
import drone_marker2 from "../assets/drone.png"

import {DroneIcon} from "../assets/drone"
import pause_icon from "../assets/pause-icon.svg"

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

function MapView({pos, size, markYaw}) {
  const [position, setPosition] = useState({lat:-2.53697577046641, lng:-44.2792379196194});
  const [marker, setMarker] = useState(null)
  const [markRotation, setMarkRotation] = useState(0)
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: Keys.GOOGLE_MAPS_API_KEY
  })
  
  useEffect(()=>{
    if(marker!=null){
      marker.setIcon({path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW, rotation:markYaw, scale:5, anchor: new window.google.maps.Point(0, 3)})
    }
  }, [markYaw])

  useEffect(()=>{
    setPosition(pos)
    if(map!=null) {
      map.setCenter(position)
      if(marker == null){
      let _mark = new window.google.maps.Marker({
        position: position,
        optimized: false,
        
        map,
        icon: {
          path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale:5,
          anchor: new window.google.maps.Point(0, 3)
        },
        title: "teste"})
      setMarker(_mark)
      //_mark.setAnimation(window.google.maps.Animation.BOUNCE)
      
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
