import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react';
import { CartItemType } from 'src/types';
import RecipientDetails from './RecepientDetails';
import icons from '@/constants/icons';
import IconButton from '../common/IconButton';
import { router } from 'expo-router';
import { useCart } from '@/providers/CartProvider';


type GiftCardPropType = {
  cartItem: CartItemType,
  showDescription?: boolean,
  className?: string,
}

const GiftCard = ({cartItem}: GiftCardPropType, ) => {
  const {amount, phone, email, giftCard, note} = cartItem;
  const {label, thumbnail} = giftCard!;
  const {addItemToEdit} = useCart();

  const editCartItem = () => {
    addItemToEdit(cartItem)
    router.navigate('/purchase-modal')
  }

  const deleteCartItem = () => {

  }

  return (
    <View className={`flex flex-col pb-8`}>
      <View className='flex-row'>
        <View className='flex-1'>
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
              <Text className='text-lg text-secondary-900 font-pregular'>{amount}</Text>
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
        <View className=''>
          <View className='my-1'>
            <IconButton icon={icons.pencil} handlePress={editCartItem} />
          </View>
          <View className='my-1'>
            <IconButton icon={icons.bin} handlePress={deleteCartItem} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bgLightOrange: {
    backgroundColor: '#f9660014'
  },
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
