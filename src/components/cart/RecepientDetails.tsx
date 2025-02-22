import { View, Text } from 'react-native'
import React from 'react';


const RecipientDetails = ({label, description}: any) => {
  return (
    <View className='flex flex-row mt-2'>
      <View className='w-16'>
        <Text className='text-md text-secondary-600 font-pregular'>{label}:</Text>
      </View>
      <View className='pl-4'>
        <Text className='text-md text-secondary-800 font-pregular'>{description}</Text>
      </View>
    </View>
  )
};

export default RecipientDetails;