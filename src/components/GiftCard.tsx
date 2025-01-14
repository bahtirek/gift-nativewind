import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { GiftCardType } from 'src/types';

type GiftCardPropType = {
  giftCard: GiftCardType
}

const GiftCard = ({giftCard}: GiftCardPropType) => {
  const {label, thumbnail, description, address} = giftCard;

  return (
    <View className='flex flex-col items-center px-4 mb-4'>
        <TouchableOpacity
          activeOpacity={0.7}
          className='mt-3 relative w-full rounded-2xl'
          style={styles.card}
        >
          <View className=''>
            <Image 
              source={{uri: thumbnail}}
              className='w-full h-40 rounded-t-2xl'
              resizeMode='cover'
            />
            <View className=' flex-1 py-2 px-4 gap-y-1'>
              <Text className='text-sm text-orange-500 font-psemibold'>{label}</Text>
              <Text className='text-xs text-gray-800 font-pregular' numberOfLines={1}>{address}</Text>
              <Text className='text-xs text-gray-500 font-pregular' numberOfLines={2}>{description}</Text>
            </View>

          </View>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9660014'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
}
})

export default GiftCard
