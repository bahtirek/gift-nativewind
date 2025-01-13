import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { CategoryItemType } from 'src/types'

type CategoryItemPropType = {
  activeItem: string,
  item: CategoryItemType,
}

const CategoryItem = ({item}: CategoryItemPropType) => {
const [category, setCategory] = useState(''); 

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setCategory(item.$id)}
      className='relative justify-center items-center'
    >
      <View className=' p-3 m-1 rounded-[20px]'>
        <ImageBackground 
          source={{uri: item.icon}}
          className='w-10 h-10 overflow-hidden'
          resizeMode='cover'
        />
      </View>
      <Text className='text-xs font-pregular text-gray-600'>{item.label}</Text>
    </TouchableOpacity>
  )
}

export default CategoryItem