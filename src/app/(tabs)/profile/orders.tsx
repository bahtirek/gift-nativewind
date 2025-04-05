import { FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItemShort from '@/components/cart/CartItemShort';
import { useCart } from '@/providers/CartProvider'; 
import CustomButton from '@/components/common/CustomButton';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import { CartItemType } from '@/types';
import icons from '@/constants/icons';
import { setOrderDetails } from '@/signals/order-details.signal';

const Orders = () => {
  const { getOrders } = useCart();
  const [orders, setOrders] = useState<CartItemType[]>([])

  useEffect(() => {
    getAllOrders()
  }, [])
  
  const getAllOrders = async() => {
    const allOrders: CartItemType[] = await getOrders();
    setOrders(allOrders)
  }

  const showOrderDetails = (item: CartItemType) => {
    setOrderDetails(item)
    router.navigate('/profile/order-details')
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Orders`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <FlatList 
        className='px-6 pt-6'
        data={orders}
        keyExtractor={(item) => item.id!}
        renderItem={({item }) => (
          <Pressable onPress={() => showOrderDetails(item)}>
            <CartItemShort cartItem={item} className="mb-6"/>
          </Pressable>
        )}
        keyboardDismissMode='on-drag'
        ListEmptyComponent={() => (
          <ListEmptyComponent
            icon={icons.emptyBasketGray}
            actionIcon={icons.search_orange}
            title='No Gift cards Found'
            subtitle='Get best Gift for your friends, co-worker or loved ones'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Orders