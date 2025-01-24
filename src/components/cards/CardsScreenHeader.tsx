import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import SearchInput from '../common/SearchInput';
import CardsScreenHeaderModal from './CardsScreenHeaderModal';
import { setInitialLocation } from '@signals/location.signal'

const CardsScreenHeader = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal);  
  }
  return (
    <View className="flex flex-column w-full relative cards-screen-header">
      <View className="flex flex-1 flex-row items-center relative">
        <View className="flex flex-1">
          <SearchInput />
        </View>
        <View className=''>
          <TouchableOpacity
            onPress={toggleSettingsModal}
            className='pl-4 pr-2 py-4'
          >
            <Image 
              source={icons.controls}
              className='!w-6 !h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>

      <CardsScreenHeaderModal showSettingsModal={showSettingsModal} toggleSettingsModal={toggleSettingsModal}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 50
      }
    })
  },
  dropdown: {
    ...Platform.select({
      android: {
        marginLeft: -15
      }
    })
  }
})

export default CardsScreenHeader