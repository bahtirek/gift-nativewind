import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { giftCardSignal } from '@/signals/giftcards.signal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Stack, Link, Href } from 'expo-router';
import CustomButton from '@/components/common/CustomButton';
import PurchaseModal from '@/components/PurchaseModal';

const GiftCardDetails = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handlePurchase = () => {
    setShowPurchaseModal(!showPurchaseModal);
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      {giftCardSignal.value.id && 
        <View  className='flex-1'>
          <Stack.Screen options={{title: `Gift Cards`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
          <View className='flex-1 pb-10'>
            <Image
              source={{uri: giftCardSignal.value.thumbnail}}
              className='w-full h-[240px] opacity-90'
              resizeMode='cover'
            />
            <View className='px-5 pt-6 rounded-2xl bg-white -mt-4 flex-1' style={styles.shadow}>
              <View className='mb-4'>
                <Text className='text-3xl text-primary font-regular'>{giftCardSignal.value.label}</Text>
                <Text className='text-xs text-secondary-600 font-regular mt-2'>{giftCardSignal.value.description}</Text>
                <Text className='text-md text-secondary-800 font-pregular mt-6'>{giftCardSignal.value.address}</Text>
                <Link className='text-md text-secondary-800 font-pregular mt-2' href={`https://${giftCardSignal.value.website}` as Href}>{giftCardSignal.value.website}</Link>
                <Link className='text-md text-secondary-800 font-pregular mt-2' href={`tel:${giftCardSignal.value.phone}`}>{giftCardSignal.value.phone}</Link>
              </View>
              
              <View className='mt-auto'>
                <CustomButton label='Purchase' handlePress={()=>{setShowPurchaseModal(true)}} />
              </View>
            </View>
          </View>
        </View>
      }
      {!giftCardSignal.value.id && <Redirect href={'/home'} />}
      {giftCardSignal.value.id && 
        <PurchaseModal showPurchaseModal={showPurchaseModal} handlePurchase={handlePurchase} closeModal={() => {setShowPurchaseModal(false)}}/>
      }
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
