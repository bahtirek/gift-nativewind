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
  const {amount, phone, email, giftCard, note, orderedDate} = cartItem;
  const {label, thumbnail} = giftCard!;
  const {addItemToEdit, deleteItemFromCart} = useCart();

  const editCartItem = () => {
    addItemToEdit(cartItem);
    setGiftCard(giftCard!)
    router.navigate('/basket/purchase-details')
  }

  const deleteCartItem = () => {
    Alert.alert('Remove Gift Card', 'Are sure you want to remove from cart?', [
      {
        text: 'Cancel',
        onPress: () => () => {return},
        style: 'cancel',
      },
      {text: 'Remove', onPress: () => deleteItemFromCart(cartItem.id!)},
    ]);
  }

  return (
    <View className={`flex flex-col`}>
      <View className=''>
        <View className=''>
          <View className='flex flex-row'>
            <View className='w-16 h-16 rounded-[8px]' style={styles.shadow}>
              <Image 
                source={{uri: thumbnail}}
                className='w-16 h-16 rounded-[8px] opacity-90'
                resizeMode='cover'
              />
            </View>
            <View className=' flex-1 pb-1 gap-y-1 pl-4'>
              <Text className='text-xl text-primary font-regular' numberOfLines={1}>{label}</Text>
              <View className='flex flex-row justify-between'>
                <Text className='text-lg text-secondary-600 font-pregular'>Value:</Text>
                <Text className='text-lg text-secondary-900 font-pregular'>{amount}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text className='text-md mt-3'>Recepient:</Text>
            <View>
              {!!email && 
                <RecipientDetails label="Email" description={email} />
              }
              {!!phone &&
                <RecipientDetails label="Phone" description={phone} />
              }
              {!!note &&
                <RecipientDetails label="Gift note" description={note} />
              }
            </View>
          </View>
        </View>
        {
          !!orderedDate &&
          <View className='mt-3'>
            <RecipientDetails label="Ordered on" description={orderedDate} />
          </View>
        }
        {
          !(!!orderedDate) &&
          <View className='flex-row justify-end mt-3'>
            <View className='mr-2'>
              <IconButton icon={icons.pencil} handlePress={editCartItem} />
            </View>
            <View className=''>
              <IconButton icon={icons.bin} handlePress={deleteCartItem} />
            </View>
          </View>
        }
      </View>
      {
        !(!!orderedDate) &&
        <View className=' mt-4 mb-8 border-b border-secondary-200'></View>
      }
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
