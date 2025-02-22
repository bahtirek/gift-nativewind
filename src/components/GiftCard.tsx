import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React from 'react';
import { GiftCardType } from 'src/types';
import { router } from 'expo-router';
import { setGiftCard } from '@/signals/giftcards.signal';

type GiftCardPropType = {
  giftCard: GiftCardType,
  showDescription?: boolean,
  className?: string,
}

const GiftCard = ({giftCard, showDescription, className}: GiftCardPropType, ) => {
  const {label, thumbnail, description, address} = giftCard;
  const goToCardDetailsScreen = () => {
    setGiftCard(giftCard)
    router.push('/gift-cards/gift-card-details')
  }
  return (
    <View className={`flex flex-col items-center ${className}`}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goToCardDetailsScreen}
        className='relative w-full rounded-xl bg-white'
        
      >
        <View className='flex flex-row justify-center items-center'>
          <View className='w-22 h-22 rounded-[8px]' style={styles.shadow}>
            <Image 
              source={{uri: thumbnail}}
              className='w-20 h-20 rounded-[8px] opacity-90'
              resizeMode='cover'
              
            />
          </View>
          <View className=' flex-1 pb-1 gap-y-1 pl-4'>
            <Text className='text-xl text-primary font-regular' numberOfLines={1}>{label}</Text>
            <Text className='text-sm text-secondary-800 font-pregular' numberOfLines={1}>{address}</Text>
            {showDescription && <Text className='text-xs text-secondary-600 font-regular' numberOfLines={1}>{description}</Text>}
          </View>

        </View>
      </TouchableOpacity>
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
