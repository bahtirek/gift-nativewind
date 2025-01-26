import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import { CustomButtonType } from 'src/types'

const CustomButton = ({label, handlePress, containerStyles, textStyles, isLoading}: CustomButtonType) => {
  return (
    <TouchableOpacity
      onPress={handlePress as (e?: GestureResponderEvent) => void}
      activeOpacity={0.7}
      className={`bg-primary rounded-xl min-h-[56px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text
        className={`text-white font-psemibold text-xl ${textStyles}`}
      >{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton