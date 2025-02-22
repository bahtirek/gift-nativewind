import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

type IconButtonType = {
  icon: ImageSourcePropType | undefined,
  handlePress: () => void
}

const IconButton = ({icon, handlePress}: IconButtonType) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className='w-12 h-12 items-center justify-center'
    >
        <Image 
          source={icon}
          className='!w-6 !h-6'
          resizeMode='cover'
        />
    </TouchableOpacity>
  )
}

export default IconButton