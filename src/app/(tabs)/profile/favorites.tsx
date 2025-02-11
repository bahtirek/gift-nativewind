import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

const Basket = () => {
  return (
    <View>
      <Stack.Screen options={{title: `Favorites`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <Text className='text-primary text-3xl'>Favorites</Text>
    </View>
  )
}

export default Basket

