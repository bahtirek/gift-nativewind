import { View, Text } from 'react-native'
import React, { useState } from 'react'

import Checkbox from 'expo-checkbox';

const CategoryCheckbox = ( { item, handelCheckBoxSelect }: any) => {
  const [isChecked, setChecked] = useState(false);

  const setValue = (value: boolean) => {
    setChecked(value);
    handelCheckBoxSelect(value)
  }
  
  return (
    <View className='flex flex-row items-center py-2'>
      <Checkbox
        value={isChecked}
        onValueChange={setValue}
        color='#FF4416'
        className='mr-5'
      />
      <Text className='text-secondary-700 text-lg'>{item.label}</Text>
    </View>
  )
}

export default CategoryCheckbox