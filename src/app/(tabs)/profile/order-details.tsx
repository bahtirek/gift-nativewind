import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/providers/CartProvider'; 
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import { CartItemType } from '@/types';
import icons from '@/constants/icons';
import { orderDetails } from '@/signals/order-details.signal';

const OrderDetails = () => {
  const [item, setItem] = useState<CartItemType>(orderDetails.value)

  useEffect(() => {
    setItem(orderDetails.value)
  }, [])

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Order details`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <View className='p-6'>
        <CartItem cartItem={item} />
      </View>
    </SafeAreaView>
  )
}

export default OrderDetails