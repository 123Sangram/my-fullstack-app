


import { useEffect, useState, useCallback, useMemo } from "react";
import { Star, FilterAlt } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { format } from "timeago.js";
import FarmerForm from "../forlogin/FarmerForm";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom user location icon
const userLocationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function SetViewOnClick({ coords, shouldUpdate }) {
  const map = useMap();
  useEffect(() => {
    if (shouldUpdate) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, shouldUpdate, map]);
  return null;
}

function Map() {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [userLocation, setUserLocation] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  // Get user location after login
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          console.log("User location:", latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Handle logout
  const handleLogout = useCallback(() => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  }, [myStorage]);

  useEffect(() => {
    if (currentUsername) {
      getUserLocation();
    }
  }, [currentUsername]);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[28.65195, 77.23149]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Show user's current location */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userLocationIcon}
          >
            <Popup>Your current location</Popup>
          </Marker>
        )}

        <SetViewOnClick
          coords={userLocation || { lat: 28.65195, lng: 77.23149 }}
          shouldUpdate={!!userLocation}
        />
      </MapContainer>

      {/* Login & Logout Buttons */}
      {currentUsername ? (
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="login" onClick={() => setShowLogin(true)}>
          Login
        </button>
      )}

      {showLogin && (
        <FarmerForm
          setShowLogin={setShowLogin}
          setCurrentUsername={setCurrentUsername}
          myStorage={myStorage}
        />
      )}
    </div>
  );
}

export default Map;
