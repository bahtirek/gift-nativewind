import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Counter = ({onCount}: any) => {
  const [counterValue, setCounterValue] = useState(1)
  const handlePress = (value: boolean) => {
    if (value) {
      setCounterValue(counterValue + 1)
    } else {
      if (counterValue > 0) setCounterValue(counterValue - 1)
    }
    onCount(counterValue)
  }
  return (
    <View className='flex-row'>
      <TouchableOpacity 
        className='w-10 h-10 rounded-md border border-1 border-primary flex justify-center items-center bg-white'
        onPress={() => handlePress(false)}
      >
        <View className='w-5 h-1 rounded bg-primary'></View>
      </TouchableOpacity>
      <View className='w-20 h-10 rounded-md bg-white flex justify-center items-center mx-2' style={styles.shadow}>
        <Text className='text-lg text-secondary-800'>{counterValue}</Text>
      </View>
      <TouchableOpacity 
        className='w-10 h-10 rounded-md border border-1 border-primary relative flex justify-center items-center bg-white'
        onPress={() => handlePress(true)}
      >
        <View className='w-5 h-1 rounded bg-primary'></View>
        <View className='w-1 h-5 rounded bg-primary absolute'></View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "rgba(152, 152, 152, 0.5)",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
});

export default Counter