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
    router.push('/home/gift-card-details')
  }
  return (
    <View className={`flex flex-col items-center ${className}`}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goToCardDetailsScreen}
        className='p-3 relative w-full rounded-xl bg-white'
        style={styles.shadow}
      >
        <View className=''>
          <Image 
            source={{uri: thumbnail}}
            className='w-full h-40 rounded-[8px] opacity-90'
            resizeMode='cover'
          />
          <View className=' flex-1 pt-2 pb-1 gap-y-1'>
            <Text className='text-xl text-primary font-regular'>{label}</Text>
            <Text className='text-sm text-secondary-700 font-pregular' numberOfLines={1}>{address}</Text>
            {showDescription && <Text className='text-xs text-secondary-700 font-regular' numberOfLines={2}>{description}</Text>}
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
    shadowColor: "rgba(152, 152, 152, 0.5)",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,

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
