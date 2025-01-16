import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { CategoryItemType } from 'src/types'

type CategoryItemPropType = {
  item: CategoryItemType,
}

const CategoryItem = ({item}: CategoryItemPropType) => {
  const [category, setCategory] = useState(''); 

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setCategory(item.id)}
      className='relative justify-center items-center'
      
    >
      <View className=' p-3 m-1 rounded-xl border border-primary'>
        <ImageBackground 
          source={{uri: item.icon}}
          className='w-10 h-10 overflow-hidden'
          resizeMode='cover'
        />
      </View>
      <Text className='text-xs font-pregular text-secondary-600'>{item.label}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  bgLightOrange: {
    backgroundColor: '#f9660014'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
}
});
export default CategoryItem