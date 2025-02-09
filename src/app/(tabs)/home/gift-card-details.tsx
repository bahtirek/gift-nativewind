import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { giftCardSignal, setGiftCard } from '@/signals/giftcards.signal';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioButton from '@/components/common/RadioButton';
import CustomInput from '@/components/common/CustomInput';
import { useRootNavigationState, Redirect } from 'expo-router';
import Counter from '@/components/common/Counter';
import CustomButton from '@/components/common/CustomButton';
import PurchaseModal from '@/components/PurchaseModal';

const GiftCardDetails = () => {
  const [selected, setSelected] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const handleSelect = (amount: string) => {
    setSelected(amount);
  }

  const handleOtherAmount = (e: any) => {
    setOtherAmount(e);
  }

  const onCount = (quantity: number) => {
    setQuantity(quantity)
  }

  const addToCart = () => {
    console.log(otherAmount, selected, quantity);
  }

  const handlePurchase = () => {
    setShowPurchaseModal(!showPurchaseModal);
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      {giftCardSignal.value.id && 
        <View  className='flex-1'>
          <View className='flex-1 pb-10'>
            <Image
              source={{uri: giftCardSignal.value.thumbnail}}
              className='w-full h-[240px] opacity-90'
              resizeMode='cover'
            />
            <View className='px-5 pt-6 rounded-2xl bg-white -mt-4 flex-1'>
              <View className='mb-4'>
                <Text className='text-3xl text-primary font-regular'>{giftCardSignal.value.label}</Text>
                <Text className='text-md text-secondary-800 font-pregular mt-2'>{giftCardSignal.value.address}</Text>
                <Text className='text-xs text-secondary-600 font-regular mt-2'>{giftCardSignal.value.description}</Text>
              </View>
              
              <View className='mt-auto'>
                <CustomButton label='Purchase' handlePress={()=>{setShowPurchaseModal(true)}} />
              </View>
            </View>
          </View>
        </View>
      }
      {!giftCardSignal.value.id && <Redirect href={'/home'} />}
      <PurchaseModal showPurchaseModal={showPurchaseModal} handlePurchase={handlePurchase} closeModal={() => {setShowPurchaseModal(false)}}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default GiftCardDetails
