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
        className='p-3 relative w-full rounded-xl border border-gray-300'
      >
        <View className=''>
          <Image 
            source={{uri: thumbnail}}
            className='w-full h-40 rounded-[8px]'
            resizeMode='cover'
          />
          <View className=' flex-1 pt-2 pb-1 gap-y-1'>
            <Text className='text-sm text-orange-500 font-psemibold'>{label}</Text>
            <Text className='text-xs text-gray-800 font-pregular' numberOfLines={1}>{address}</Text>
            {showDescription && <Text className='text-xs text-gray-500 font-pregular' numberOfLines={2}>{description}</Text>}
          </View>

        </View>
      </TouchableOpacity>
    </View>
  )
}

export default GiftCard
