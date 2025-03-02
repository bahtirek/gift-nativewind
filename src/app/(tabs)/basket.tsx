import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/providers/CartProvider'; 
import CustomButton from '@/components/common/CustomButton';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import icons from '@/constants/icons';
import { router } from 'expo-router';

export default function Basket() {
  const { items } = useCart();

  const checkout = () => {
    console.log('checkout');
    router.navigate('/payment-modal')
  }

  const openSearchModal = () => {
    router.navigate('/gift-cards')
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <FlatList 
        className='px-6 pt-6'
        data={items}
        keyExtractor={(item) => item.id!}
        renderItem={({item }) => (
          <CartItem cartItem={item} className="mb-6" />
        )}
        keyboardDismissMode='on-drag'
        ListEmptyComponent={() => (
          <ListEmptyComponent
            icon={icons.emptyBasketGray}
            actionIcon={icons.search_orange}
            handleAction={openSearchModal}
            title='No Gift cards Found'
            subtitle='Get best Gift for your friends, co-worker or loved ones'
          />
        )}
      />
      {
        items.length > 0 &&
        <View className='px-6 pb-6 pt-2'>
          <CustomButton label='Checkout' handlePress={checkout} />
        </View>
      }
    </SafeAreaView>
  );
}
