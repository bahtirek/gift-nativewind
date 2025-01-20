import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import SearchInput from '../common/SearchInput';
import CategoryFilterList from '../CategoryList/CategoryFilterList';
import LocationDropdown from '../LocationDropdown';

const CardsScreenHeader = ( {viewportWidth}: any) => {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  }
  
  return (
    <View className="flex flex-column w-full relative cards-screen-header">
      <View className="flex  flex-1 flex-row items-center relative">
        <View className="flex  flex-1">
          <SearchInput />
        </View>
        <View className=''>
          <TouchableOpacity
            onPress={toggleSettings}
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

      <Modal
        animationType="slide"
        visible={showSettings}
        >
        <View className='flex w-full h-full bg-white' style={styles.container}>
          <View className='flex items-end'>
            <Pressable
              onPress={() => toggleSettings()}
                className="p-4">
              <Image 
                source={icons.cancel}
                className='!w-5 !h-5'
                resizeMode='contain'
              />
            </Pressable>
          </View>
          <View className="flex bg-white px-8">
            <Text className='text-primary mt-5 mb-2'>Category{viewportWidth}</Text>
            <CategoryFilterList />
            <Text className='text-primary mt-7'>Location</Text>
            <View style={styles.dropdown}>
              <LocationDropdown />
            </View>
          </View>
        </View>
      </Modal>
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