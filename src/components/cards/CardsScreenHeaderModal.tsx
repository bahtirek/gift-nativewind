import { View, Text, Modal, Image, StyleSheet, Pressable, Platform } from 'react-native'
import React from 'react'
import icons from '@constants/icons';
import CategoryFilterList from '../CategoryList/CategoryFilterList';
import LocationDropdown from '../LocationDropdown';

const CardsScreenHeaderModal = ( {showSettingsModal, toggleSettingsModal}: any) => {
  
  return (
    <Modal
      animationType="slide"
      visible={showSettingsModal}
      >
      <View className='flex w-full h-full bg-white' style={styles.container}>
        <View className='flex items-end'>
          <Pressable onPress={toggleSettingsModal} className="p-4">
            <Image 
              source={icons.cancel}
              className='!w-5 !h-5'
              resizeMode='contain'
            />
          </Pressable>
        </View>
        <View className="flex bg-white px-8">
          <Text className='text-primary mt-5 mb-2'>Category</Text>
          <CategoryFilterList />
          <Text className='text-primary mt-7'>Location</Text>
          <View style={styles.dropdown}>
            <LocationDropdown />
          </View>
        </View>
      </View>
    </Modal>
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

export default CardsScreenHeaderModal