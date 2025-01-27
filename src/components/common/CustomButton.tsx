import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import { CustomButtonType } from 'src/types'

const CustomButton = ({label, handlePress, containerStyles, textStyles, isLoading}: CustomButtonType) => {
  return (
    <TouchableOpacity
      onPress={handlePress as (e?: GestureResponderEvent) => void}
      activeOpacity={0.7}
      className={`rounded-xl border-b-[5px] border border-gray-200 min-h-[56px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text
        className={`text-primary font-semibold text-2xl ${textStyles}`}
      >{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton