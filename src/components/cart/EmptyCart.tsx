import { View, Image, Text } from 'react-native'
import React from 'react'
import images from '@constants/icons'
import { router } from 'expo-router'
import IconButton from '../common/IconButton'
import icons from '@constants/icons'

type EmptyStateType = {
  title?: string,
  subtitle?: string
}

const openSearchModal = () => {
  console.log('open search modal');
  
}
const EmptyState = ({title, subtitle}: EmptyStateType) => {
  return (
    <View className='justify-center items-center mt-20'>
      <Image
        source={images.emptyBasketGray}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />
      <Text className='text-xl font-psemibold text-gray-700 mt-4'>{title}</Text>
      <Text className='font-pmedium text-sm text-gray-700 mt-2'>{subtitle}</Text>
      <View className='mt-6'>
        <IconButton icon={icons.search_orange} handlePress={openSearchModal} />
      </View>
    </View>
  )
}

export default EmptyState