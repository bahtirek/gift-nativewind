import { signal, effect, computed } from "@preact/signals-react";
import locations from "@assets/data/locations";
import { Location } from "@/types";


const setInitialLocation = () => {
  return {
    id: '6',
    name: 'PBG'
  }
}

const getLocations = () => {
  return locations
}

const setLocation = (id: string) => {
  const location = allLocationsSignal.value.find(locationItem => locationItem.id == id);
  if (location) locationSignal.value = location;
}

const locationSignal = signal(setInitialLocation());
const allLocationsSignal = signal(getLocations());

export {
  setInitialLocation,
  getLocations,
  setLocation,
  locationSignal,
  allLocationsSignal
} 
  
