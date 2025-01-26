import { TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';

const SearchButton = ({handlePress}: any) => {
  return (      
  <TouchableOpacity
    onPress={handlePress}
    className='p-4 mr-2'
  >
    <Image 
      source={icons.search_orange}
      className='!w-6 !h-6'
      resizeMode='contain'
    />
  </TouchableOpacity>
  )
}

export default SearchButton