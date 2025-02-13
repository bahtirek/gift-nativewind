import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import { cartSignal } from '@/signals/cart.signal'
import { effect, useSignal } from '@preact/signals-react';

import CartItem from '@/components/CartItem';
import { CartItemType } from '@/types';
import { useCart } from '@/providers/CartProvider'; 

export default function Basket() {
  const { items } = useCart();

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList 
        className='px-6'
        data={items}
        keyExtractor={(item) => item.id!}
        renderItem={({item }) => (
          <CartItem cartItem={item} className="mb-6" />
        )}
        keyboardDismissMode='on-drag'
      />
      <StatusBar backgroundColor="#FFFBFA" style="dark" />
    </SafeAreaView>
  );
}
