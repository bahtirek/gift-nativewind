import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, Alert, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import SearchInput from '../common/SearchInput';
import CategoryFilterList from '../CategoryList/CategoryFilterList';

const CardsScreenHeader = ( { handleSearchQuery }: any) => {
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
        <View className='pl-4'>
          <TouchableOpacity
            onPress={toggleSettings}
            className=''
          >
            <Image 
              source={icons.controls}
              className='!w-6 !h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </View>
      {showSettings && 
        <View className='overflow-hidden w-[calc(100%+2.5rem)] absolute top-[70px] -mx-5 pb-4'>
          <View 
            className="flex flex-row items-center bg-white"
            style={styles.shadow}
            >
            <CategoryFilterList />
          </View>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#FF4416",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  }
});

export default CardsScreenHeader