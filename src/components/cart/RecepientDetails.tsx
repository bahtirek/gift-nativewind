import { View, Text } from 'react-native'
import React from 'react';
import { StyleSheet } from 'nativewind';


const RecipientDetails = ({label, description}: any) => {
  return (
    <View className='flex flex-row mt-2 justify-between'>
      <View className='w-18'>
        <Text className='text-md text-secondary-600 font-pregular'>{label}:</Text>
      </View>
      <View className='w-[240px]'>
        <Text className='text-md text-secondary-800 font-pregular text-right'>{description}</Text>
      </View>
    </View>
  )
};

export default RecipientDetails;