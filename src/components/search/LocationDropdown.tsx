import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import { useSearchSettings } from '@/providers/SearchSettingsProvider';


const LocationDropdown = () => {
  const { locations, location, updateLocation } = useSearchSettings();
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    if(location) setSelectedLocation(location.id!)
  }, [location])

  const setLocation = (locationId: string) => {
    setSelectedLocation(locationId)
    updateLocation(locationId)
  }
  
  return (
    <View>
      <Picker
        className='mt-2 text-md text-secondary-700 h-14 rounded-xl border border-secondary-200 focus:border-primary'
        selectedValue={selectedLocation}
        onValueChange={(locationId) => setLocation(locationId)}>
        {
          locations?.map((location) => {
            return <Picker.Item label={location.name} value={location.id} key={location.id} />
          })
        }
      </Picker>
    </View>
  )
}

export default LocationDropdown