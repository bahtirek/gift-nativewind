import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import { ListItemType } from '@/types'

const ListItem = ({
  label,
  handlePress,
  containerStyles
}: ListItemType ) => {
  return (
    <TouchableOpacity
      onPress={handlePress as (e?: GestureResponderEvent) => void}
      activeOpacity={0.7}
      className={`px-6 py-4 border border-t-0 border-x-0 border-gray-400 ${containerStyles}`}
    >
      <Text className='text-lg'>{label}</Text>
    </TouchableOpacity>
  )
}

export default ListItem