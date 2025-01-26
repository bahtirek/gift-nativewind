import { View } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import { locationSignal, allLocationsSignal, setLocation } from '@/signals/location.signal';


const LocationDropdown = () => {
  const [selectedLocation, setSelectedLocation] = useState(locationSignal.value.id);

  const setLocationSignal = (locationId: string) => {
    console.log(locationId);
    setSelectedLocation(locationId)
    setLocation(locationId)
  }
  
  return (
    <View>
      <Picker
        className='mt-2 text-md text-secondary-700 h-14 rounded-xl border border-secondary-200 focus:border-primary'
        selectedValue={selectedLocation}
        onValueChange={(locationId, index) => setLocationSignal(locationId)}>
        {
          allLocationsSignal.value.map((location, index) => {
            return <Picker.Item label={location.name} value={location.id} key={location.id} />
          })
        }
      </Picker>
    </View>
  )
}

export default LocationDropdown