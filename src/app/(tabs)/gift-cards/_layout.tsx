import React from 'react'
import { Stack } from 'expo-router'

const GiftCardsStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Gift cards', headerTintColor: '#FF4416', headerShown: true}} />
    </Stack>
  )
}

export default GiftCardsStack