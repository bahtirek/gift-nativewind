import React from 'react'
import { Stack } from 'expo-router'

const HomeStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Profile'}} />
    </Stack>
  )
}

export default HomeStack