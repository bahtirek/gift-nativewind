import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const Orders = () => {
  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Orders`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <Text>Orders</Text>
    </SafeAreaView>
  )
}

export default Orders