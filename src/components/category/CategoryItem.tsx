import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { CategoryItemType } from 'src/types'
import { setCategory, resetCategories } from '@signals/category.signal';
import { router } from 'expo-router';

type CategoryItemPropType = {
  item: CategoryItemType,
}

const CategoryItem = ({item}: CategoryItemPropType) => {
  const handelCheckBoxSelect = (id: string) => {
    resetCategories();
    setCategory(id, true);
    router.navigate('/home/gift-cards');
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handelCheckBoxSelect(item.id)}
      className='relative justify-center items-center'
      
    >
      <View className=' p-3 m-1 rounded-xl bg-white' style={styles.shadow}>
        <ImageBackground 
          source={{uri: item.icon}}
          className='w-10 h-10 overflow-hidden'
          resizeMode='cover'
        />
      </View>
      <Text className='text-xs font-pregular text-primary'>{item.label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bgLightOrange: {
    backgroundColor: '#f9660014'
  },
  shadow: {
    shadowColor: "rgba(152, 152, 152, 0.5)",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
});

export default CategoryItem