import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React from 'react';
import { CartItemType } from 'src/types';


type GiftCardPropType = {
  cartItem: CartItemType,
  showDescription?: boolean,
  className?: string,
}

const GiftCard = ({cartItem}: GiftCardPropType, ) => {
  const {amount, phone, email, giftCard} = cartItem;
  const {label, thumbnail} = giftCard!;
  const goToCardDetailsScreen = () => {
    //router.push('/gift-cards/gift-card-details')
  }
  return (
    <View className={`flex flex-col pt-6`}>

        <View className='flex flex-row'>
          <View className='w-22 h-22 rounded-[8px]' style={styles.shadow}>
            <Image 
              source={{uri: thumbnail}}
              className='w-20 h-20 rounded-[8px] opacity-90'
              resizeMode='cover'
              
            />
          </View>
          <View className=' flex-1 pb-1 gap-y-1 pl-4'>
            <Text className='text-xl text-primary font-regular' numberOfLines={1}>{label}</Text>
            <Text className='text-md text-secondary-800 font-pregular'>{amount}</Text>
            {!!email &&
              <Text className='text-sm text-secondary-800 font-pregular'>{email}</Text>
            }
            {!!phone &&
              <Text className='text-sm text-secondary-800 font-pregular'>{phone}</Text>
            }
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
