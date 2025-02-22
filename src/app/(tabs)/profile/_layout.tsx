import React from 'react'
import { Stack } from 'expo-router'

const ProfileStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Profile', headerTintColor: '#FF4416', headerShown: true, headerTitleStyle: { color: '#FF4416' } }} />
    </Stack>
  )
}

export default ProfileStack