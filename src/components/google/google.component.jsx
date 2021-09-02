// libs
import React from 'react';
import GoogleMapReact from 'google-map-react';

export const GoogleMaps = ({ geoLoc, children }) => {
  return (
    <GoogleMapReact
      // TODO : move api key to env file
      bootstrapURLKeys={{ key: 'AIzaSyA9_lx3hdcmjjPDjD_rIrxkfCEr6Uu_VUQ' }}
      defaultCenter={{
        lat: geoLoc.latitude,
        lng: geoLoc.longitude
      }}
      defaultZoom={15}>
      {children}
    </GoogleMapReact>
  );
};
