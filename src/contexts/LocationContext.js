import React, { createContext, useContext, useState } from 'react';
import { reverseGeocode } from '../data/locations';
import { useAuth } from './AuthContext';

const LocationContext = createContext({
  location: null,
  setLocation: () => {},
  requestLocation: () => {},
  isLoading: false,
  error: null,
});

export function LocationProvider({ children }) {
  const { user, updateUserLocation } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Location comes from user profile if authenticated
  const location = user?.location || null;

  const setLocation = (loc) => {
    if (user) {
      updateUserLocation(loc);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const geocoded = reverseGeocode(latitude, longitude);
        setLocation({
          ...geocoded,
          coords: { lat: latitude, lon: longitude },
          method: 'auto',
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message || 'Unable to retrieve your location');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, requestLocation, isLoading, error }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
