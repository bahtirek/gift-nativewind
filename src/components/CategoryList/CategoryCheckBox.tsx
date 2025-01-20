import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

import Checkbox from 'expo-checkbox';

const CategoryCheckbox = ( { item, handelCheckBoxSelect}: any) => {
  const [isChecked, setChecked] = useState(item.checked);

  const setValue = (value: boolean) => {
    handelCheckBoxSelect(value);
    setChecked(!isChecked);   
  }
  
  return (
    <View className='flex flex-row items-center py-2'>
      <Checkbox
        value={isChecked}
        onValueChange={setValue}
        color='#FF4416'
        className='mr-5'
      />
      <Pressable onPress={() => { setValue(!isChecked) }}>
        <Text className='text-secondary-700 text-lg'>{item.label}</Text>
      </Pressable>
    </View>
  )
}

export default CategoryCheckbox