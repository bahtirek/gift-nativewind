import { FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/providers/CartProvider'; 
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import { CartItemType } from '@/types';
import icons from '@/constants/icons';

const OrderDetails = () => {
  const { itemParam } = useLocalSearchParams<{ itemParam: string }>();
  const { getOrders } = useCart();
  const [orders, setOrders] = useState<CartItemType[]>([])
  const [item, setItem] = useState<CartItemType>({})

  useEffect(() => {
    getAllOrders()
  }, [])

  useEffect(() => {
    if(!itemParam) {
      //router.back();
    }
    setItem(JSON.parse(itemParam))
    console.log(JSON.parse(itemParam));
    
  }, [])
  
  const getAllOrders = async() => {
    const allOrders: CartItemType[] = await getOrders();
    setOrders(allOrders)
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Order details`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <View className='p-6'>
        {
          !!item.id && 
          <CartItem cartItem={item} className="mb-6" />
        }
      </View>
    </SafeAreaView>
  )
}

export default OrderDetails