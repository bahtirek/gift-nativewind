import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Account = () => {
  return (
    <View>
      <Stack.Screen options={{title: `Account`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <Text>Account</Text>
    </View>
  )
}

export default Account