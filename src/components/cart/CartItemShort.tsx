import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import React, { useState } from 'react';
import { CartItemType } from 'src/types';
import RecipientDetails from './RecepientDetails';
import icons from '@/constants/icons';
import IconButton from '../common/IconButton';
import { router } from 'expo-router';
import { useCart } from '@/providers/CartProvider';
import { setGiftCard } from '@/signals/giftcards.signal';


type GiftCardPropType = {
  cartItem: CartItemType,
  showDescription?: boolean,
  className?: string,
}

const GiftCard = ({cartItem}: GiftCardPropType, ) => {
  const {amount, phone, email, giftCard, note} = cartItem;
  const {label, thumbnail} = giftCard!;
  const {addItemToEdit, deleteItemFromCart} = useCart();

  return (
    <View className={`flex flex-col pb-2 mb-4 border-b border-secondary-200`}>
      <View className='flex flex-row'>
        <View className=' flex-1 pb-1 gap-y-1'>
          <Text className='text-md text-primary font-regular' numberOfLines={1}>{label}</Text>
          <View className='flex flex-row justify-between'>
            <Text className='text-sm text-secondary-600 font-pregular'>Value:</Text>
            <Text className='text-md text-secondary-900 font-pregular'>{amount}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
});

export default GiftCard
