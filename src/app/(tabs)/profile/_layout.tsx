import React from 'react'
import { Stack } from 'expo-router'

const ProfileStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Profile', headerShown: false}} />
    </Stack>
  )
}

export default ProfileStack