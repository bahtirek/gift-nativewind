import { View, Text, Modal, Image, StyleSheet, Pressable, Platform, GestureResponderEvent } from 'react-native'
import React from 'react'
import icons from '@constants/icons';
import CategoryFilterList from '../category/CategoryFilterList';
import LocationDropdown from './LocationDropdown';
import SearchInput from '../common/SearchInput';
import CustomButton from '../common/CustomButton';

const CardsScreenHeaderModal = ( {showSearchModal, closeModal, handleSearch}: any) => {
  
  return (
    <Modal
      animationType="slide"
      visible={showSearchModal}
      >
      <View className='flex w-full h-full bg-white' style={styles.container}>
        <View className='flex items-end'>
          <Pressable onPress={closeModal as (e?: GestureResponderEvent) => void} className="p-4">
            <Image 
              source={icons.cancel}
              className='!w-5 !h-5'
              resizeMode='contain'
            />
          </Pressable>
        </View>
        <View className="flex bg-white px-8 pb-10 flex-1">
          <View className="mt-6">
            <SearchInput handleSearchQuery={handleSearch} />
          </View>
          <Text className='text-primary mt-5 mb-2'>Category</Text>
          <CategoryFilterList />
          <Text className='text-primary mt-7'>Location</Text>
          <View style={styles.dropdown}>
            <LocationDropdown />
          </View>
          <View className='mt-auto'>
            <CustomButton label={'Search'} handlePress={handleSearch}/>
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