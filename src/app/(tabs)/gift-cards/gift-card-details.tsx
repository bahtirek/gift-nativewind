import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { giftCardSignal } from '@/signals/giftcards.signal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Stack, Link, Href, router } from 'expo-router';
import CustomButton from '@/components/common/CustomButton';
import { useCart } from '@/providers/CartProvider';

const GiftCardDetails = () => {
  const {addItemToEdit} = useCart();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handlePurchase = () => {
    addItemToEdit({});
    router.navigate('/gift-cards/purchase-details')
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      {giftCardSignal.value.id && 
        <View  className='flex-1'>
          <Stack.Screen options={{title: `${giftCardSignal.value.label}`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
          <View className='px-6 flex-1 py-6'>
            <View 
              className='flex rounded-2xl'
              style={[styles.image, styles.shadow]}
            >
              <Image
                source={{uri: giftCardSignal.value.thumbnail}}
                className='opacity-90 w-full h-full rounded-2xl'
                resizeMode='cover'
              />
            </View>
            <View className='pt-4 bg-white flex-1'>
              <View className='mb-12'>
                <Text className='text-xs text-secondary-600 font-regular mt-2'>{giftCardSignal.value.description}</Text>
                <Text className='text-md text-secondary-800 font-pregular mt-6'>{giftCardSignal.value.address}</Text>
                <Link className='text-md text-secondary-800 font-pregular mt-2' href={`https://${giftCardSignal.value.website}` as Href}>{giftCardSignal.value.website}</Link>
                <Link className='text-md text-secondary-800 font-pregular mt-2' href={`tel:${giftCardSignal.value.phone}`}>{giftCardSignal.value.phone}</Link>
              </View>
              
              <View className='mt-auto'>
                <CustomButton label='Purchase' handlePress={()=>{handlePurchase()}} />
              </View>
            </View>
          </View>
        </View>
      }
      {!giftCardSignal.value.id && <Redirect href={'/home'} />}
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 1.15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
})

export default GiftCardDetails
