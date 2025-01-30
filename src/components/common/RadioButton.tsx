import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const RadioButton = ({className, label, value, status, onSelect}: any) => {
  const changeValue = () => {
    onSelect();
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={changeValue}
      className={`flex flex-row items-center ${className}`}
    >
      <View className='h-7 w-7 rounded-3xl border border-1 border-primary flex justify-center items-center'>
        {status && <View className='h-4 w-4 rounded-3xl bg-primary'></View>}
      </View>
      <Text className='ml-3 -mt-1 text-lg text-gray-700'>{label}</Text>
    </TouchableOpacity>
  )
}

export default RadioButton