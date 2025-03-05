import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react'
import { Link, router, Stack } from 'expo-router';
import icons from '@/constants/icons'; 

const OrderConfirmation = () => {
  const goToHome = () => {
    router.replace('/home')
  }
  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{headerShown: false}} />
      <View className='mt-20 items-center'>
        <Image
          source={icons.giftCard}
          className='!w-20 !h-20 opacity-80'
          resizeMode='contain'
        />
        <Text className='text-2xl mb-6 mt-6 text-primary-700 text-center'>Congradulations!</Text>
        <Text className='text-xl mb-2 text-gray-700 text-center'>Gift cards were sent to recepients</Text>
        <View className='flex-row'>
          <Text className='text-xl text-gray-700 text-center pr-2'>Thanks for choosing</Text>
          <Text className='text-xl text-primary-700 text-center'>GiftGenie!</Text>
        </View>
        <TouchableOpacity onPress={goToHome} activeOpacity={0.5}>
          <Text className='text-xl text-primary-700 underline mt-10'>Return to home screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default OrderConfirmation