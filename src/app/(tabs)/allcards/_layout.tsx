import React from 'react'
import { Stack } from 'expo-router'

const SearchStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: 'Gift Cards', headerShown: false}} />
    </Stack>
  )
}

export default SearchStack