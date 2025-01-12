import React from 'react'
import { Stack } from 'expo-router'

const MenuStack = () => {
  return (
    <Stack>
      {/* to hide the header <Stack.Screen options={{title: 'Home', headerShown: false}} /> */}
      <Stack.Screen name="index" options={{title: 'Home'}} />
    </Stack>
  )
}

export default MenuStack