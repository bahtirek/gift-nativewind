import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Orders = () => {
  return (
    <View>
      <Stack.Screen options={{title: `Orders`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <Text>Orders</Text>
    </View>
  )
}

export default Orders