import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";

import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/providers/CartProvider'; 
import EmptyCart from '@/components/cart/EmptyCart';
import CustomButton from '@/components/common/CustomButton';

export default function Basket() {
  const { items } = useCart();

  const checkout = () => {
    console.log('checkout');
    
  }
  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <FlatList 
        className='px-5 pt-6'
        data={items}
        keyExtractor={(item) => item.id!}
        renderItem={({item }) => (
          <CartItem cartItem={item} className="mb-6" />
        )}
        keyboardDismissMode='on-drag'
        ListEmptyComponent={() => (
          <EmptyCart
            title='No Gift cards Found'
            subtitle='Get best Gift for your friends, co-worker or loved ones'
          />
        )}
      />
      {
        items.length > 0 &&
        <View className='px-5 pb-6 pt-2'>
          <CustomButton label='Checkout' handlePress={checkout} />
        </View>
      }
    </SafeAreaView>
  );
}
