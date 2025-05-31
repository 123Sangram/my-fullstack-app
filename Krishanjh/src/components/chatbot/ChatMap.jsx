import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const ChatMap = ({ selectedUser, currentUser }) => {
  const GOOGLE_MAPS_API_KEY = 'AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg';
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [distance, setDistance] = useState(null);

  const mapStyles = {
    height: '400px',
    width: '100%',
    borderRadius: '12px',
    margin: '10px 0'
  };

  const defaultCenter = {
    lat: 20.5937,
    lng: 78.9629
  };

  const dummyFarmerLocation = {
    lat: 28.6139,
    lng: 77.2090
  };

  const dummyBuyerLocation = {
    lat: 28.7041,
    lng: 77.1025
  };

  const getUserLocation = (user) => {
    if (user?.location?.lat && user?.location?.lng) {
      return user.location;
    }
    
    if (user?.userType === 'buyer') {
      return dummyBuyerLocation;
    }
    return dummyFarmerLocation;
  };

  const currentUserIcon = {
    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    scaledSize: { width: 40, height: 40 }
  };

  const selectedUserIcon = {
    url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
    scaledSize: { width: 40, height: 40 }
  };

  useEffect(() => {
 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          
          const userLocation = getUserLocation(selectedUser);
          calculateDistance(location, userLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
          const userLocation = getUserLocation(currentUser);
          setCurrentLocation(userLocation);
          
          const selectedUserLocation = getUserLocation(selectedUser);
          calculateDistance(userLocation, selectedUserLocation);
        }
      );
    } else {
   
      const userLocation = getUserLocation(currentUser);
      setCurrentLocation(userLocation);
      
   
      const selectedUserLocation = getUserLocation(selectedUser);
      calculateDistance(userLocation, selectedUserLocation);
    }
  }, [selectedUser, currentUser]);

  const calculateDistance = (point1, point2) => {
    if (!point1 || !point2) return;
    
    const R = 6371;
    const dLat = toRad(point2.lat - point1.lat);
    const dLon = toRad(point2.lng - point1.lng);
    const lat1 = toRad(point1.lat);
    const lat2 = toRad(point2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    setDistance(d.toFixed(2));
  };

  const toRad = (value) => {
    return value * Math.PI / 180;
  };

 
  const selectedUserLocation = selectedUser ? getUserLocation(selectedUser) : null;

  const center = selectedUserLocation && currentLocation ? {
    lat: (currentLocation.lat + selectedUserLocation.lat) / 2,
    lng: (currentLocation.lng + selectedUserLocation.lng) / 2
  } : currentLocation || defaultCenter;

  const mapOptions = {
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#215A37' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#c9c9c9' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#f5f5f5' }]
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <FaMapMarkerAlt className="text-[#215A37] text-xl" />
        <h2 className="text-xl font-semibold text-[#215A37]">Chat Location</h2>
      </div>
      
      <div className="my-2 text-sm text-gray-600">
        <p>Note: This map shows approximate locations for demonstration purposes.</p>
      </div>
      
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={center}
          options={mapOptions}
        >
          {currentLocation && (
            <Marker
              position={currentLocation}
              icon={currentUserIcon}
              onClick={() => setSelectedMarker('current')}
            />
          )}

          {selectedUserLocation && (
            <Marker
              position={selectedUserLocation}
              icon={selectedUserIcon}
              onClick={() => setSelectedMarker('selected')}
            />
          )}

          {selectedMarker === 'current' && currentLocation && (
            <InfoWindow
              position={currentLocation}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-2">
                <h3 className="font-semibold text-[#215A37]">Your Location</h3>
                {distance && (
                  <p className="text-sm text-gray-600">
                    Distance to partner: {distance} km
                  </p>
                )}
              </div>
            </InfoWindow>
          )}

          {selectedMarker === 'selected' && selectedUserLocation && (
            <InfoWindow
              position={selectedUserLocation}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-2">
                <h3 className="font-semibold text-[#215A37]">{selectedUser?.name || 'Partner'}</h3>
                {distance && (
                  <p className="text-sm text-gray-600">
                    Distance from you: {distance} km
                  </p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {distance && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-[#215A37] font-semibold">Distance Information</h3>
          <p className="text-gray-600">
            Distance between you and {selectedUser?.name || 'your partner'}: {distance} kilometers
          </p>
        </div>
      )}
    </motion.div>
  );
};

ChatMap.propTypes = {
  selectedUser: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    name: PropTypes.string,
    userType: PropTypes.string
  }),
  currentUser: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    userType: PropTypes.string
  })
};

export default ChatMap; 