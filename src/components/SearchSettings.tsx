import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { GiftCardType } from 'src/types';

type GiftCardPropType = {
  giftCard: GiftCardType,
  showDescription?: boolean,
  className?: string,
}

const GiftCard = ({giftCard, showDescription, className}: GiftCardPropType, ) => {
  const {label, thumbnail, description, address} = giftCard;

  return (
    <View className={`flex flex-col items-center ${className}`}>
      <TouchableOpacity
        activeOpacity={0.7}
        className='p-3 relative w-full rounded-xl border border-secondary-200'
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

export default GiftCard
