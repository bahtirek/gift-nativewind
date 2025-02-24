import { CategoryItemType, LocationType } from "@/types";
import allCategories from "@assets/data/categories";
import allLocations from "@assets/data/locations";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type SearchSettingsProviderType = {
  categories: CategoryItemType[],
  locations: LocationType[],
  location: LocationType | undefined,
  updateCategories: (id: string, value: boolean) => void,
  updateLocation: (id: string) => void,
}

export const SearchSettingsContext = createContext<SearchSettingsProviderType>({
  categories: [],
  locations: [],
  location: {},
  updateCategories: () => {},
  updateLocation: () => {},
});


const SearchSettingsProvider = ({children}: PropsWithChildren) => {
  const [categories, setCategories] = useState<CategoryItemType[]>([]);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [location, setLocation] = useState<LocationType>();

  useEffect(() => {
    getCategoriesFromStorage();
    getLocationsFromStorage();
    getLocationFromStorage();
  }, []);

  useEffect(() => {
    saveCategoriesToStorage()
  }, [categories])

  useEffect(() => {
    saveLocationToStorage()
  }, [location])

  const updateCategories = (id: string, value: boolean) => {
    setCategories(categories.map((category: CategoryItemType) => {
      if(category.id == id) {
        return { ...category, checked: value}
      }
  
      return category;
    }))
  }

  const updateLocation = (id: string) => {
    const location = locations.find(locationItem => locationItem.id == id);
    if (location) {
      setLocation(location)
    }
  }

  const saveCategoriesToStorage = async() => {
    try {
      const jsonValue = JSON.stringify(categories);
      await AsyncStorage.setItem('categories', jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  const saveLocationToStorage = async() => {
    try {
      const jsonValue = JSON.stringify(location);
      await AsyncStorage.setItem('location', jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  const getCategoriesFromStorage = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('categories');
      if(jsonValue != null) {
        setCategories(JSON.parse(jsonValue)) 
      } else {
        //pull from back
        setCategories(allCategories) 
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getLocationFromStorage = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('location');
      if(jsonValue != null) {
        setLocation(JSON.parse(jsonValue)) 
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getLocationsFromStorage = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('locations');
      if(jsonValue != null) {
        setLocations(JSON.parse(jsonValue)) 
      } else {
        //pull from back
        setLocations(allLocations) 
      }
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <SearchSettingsContext.Provider value={{categories, locations, location, updateCategories, updateLocation}}>
      {children}
    </SearchSettingsContext.Provider>
  )
}

export default SearchSettingsProvider;

export const useSearchSettings = () => useContext(SearchSettingsContext)