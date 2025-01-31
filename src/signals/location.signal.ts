import { signal, effect, computed } from "@preact/signals-react";
import locations from "@assets/data/locations";
import { Location } from "@/types";
import AsyncStorage from '@react-native-async-storage/async-storage';


const setInitialLocation = async() => {
  try {
    const jsonValue = await AsyncStorage.getItem('location');
    if(jsonValue != null) {
      locationSignal.value = JSON.parse(jsonValue);
      console.log(locationSignal.value);  
    }
  } catch (e) {
    console.log(e);
  }
}

const getLocations = () => {
  return locations
}

const setLocation = (id: string) => {
  const location = allLocationsSignal.value.find(locationItem => locationItem.id == id);
  if (location) {
    locationSignal.value = location;
    storeLocation(location)
  }
}

const storeLocation = async (value: Location) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('location', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const locationSignal = signal<Location>({});
const allLocationsSignal = signal(getLocations());

export {
  setInitialLocation,
  getLocations,
  setLocation,
  locationSignal,
  allLocationsSignal
} 
  
