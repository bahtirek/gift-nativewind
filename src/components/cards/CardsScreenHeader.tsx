import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, Alert, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import { categorySignal } from "@signals/search.signal";
import Checkbox from 'expo-checkbox';
import CategoryCheckbox from '../CategoryList/CategoryCheckBox';
import SearchInput from '../common/SearchInput';
import { computed } from "@preact/signals-react";
import CategoryFilter from '../CategoryList/CategoryFilter';

const CardsScreenHeader = ( { handleSearchQuery }: any) => {
  const [showSettings, setShowSettings] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    //setModalVisible(!modalVisible);
  }

  const handelCheckBoxSelect = () => {
    console.log("checked");
  }

  const filters = computed(() => {
    return categorySignal.value.filter(category => category.checked)
  })
  
  return (
    <View className="flex flex-column w-full relative">
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
            <CategoryFilter />
          </View>
        </View>
      }
      {!showSettings && 
        <View>
          <FlatList
            className='pt-2 flex flex-row flex-wrap'
            data={filters.value}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <Text className='mr-4 text-secondary-700'>*{item.label}</Text>
            )}
          />
        </View>
      }
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View className='flex items-center justify-center p-5'>
            <View className='flex items-center justify-center w-full m-20 bg-white border rounded-2xl border-gray-600'>
              <Text>Hello World!</Text>
              <Pressable
                onPress={() => setModalVisible(!modalVisible)}>
                <Text >Hide Modal</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
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