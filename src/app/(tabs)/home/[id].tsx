import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'

const CardDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{title: `Card ${id} details`}} />
      <Text>card id  - {id}</Text>
    </View>
  )
}

export default CardDetails;