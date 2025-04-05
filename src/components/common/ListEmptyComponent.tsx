import { View, Image, Text, ImageSourcePropType } from 'react-native'
import React from 'react'
import IconButton from './IconButton'

type EmptyStateType = {
  title?: string,
  subtitle?: string,
  icon?: ImageSourcePropType,
  actionIcon?: ImageSourcePropType, 
  handleAction?: any
}

const ListEmptyComponent = ({title, subtitle, icon, actionIcon, handleAction}: EmptyStateType) => {
  return (
    <View className='justify-center items-center mt-20'>
      <Image
        source={icon}
        className='w-[100px] h-[80px]'
        resizeMode='contain'
      />
      <Text className='text-xl font-psemibold text-gray-700 mt-4'>{title}</Text>
      <Text className='font-pmedium text-sm text-gray-700 mt-2'>{subtitle}</Text>
      <View className='mt-6'>
        {
          actionIcon &&
          <IconButton icon={actionIcon} handlePress={handleAction} />
        }
      </View>
    </View>
  )
}

export default ListEmptyComponent