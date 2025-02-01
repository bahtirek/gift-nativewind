import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { giftCardSignal, setGiftCard } from '@/signals/giftcards.signal';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioButton from '@/components/common/RadioButton';
import CustomInput from '@/components/common/CustomInput';
import { useRootNavigationState, Redirect } from 'expo-router';
import Counter from '@/components/common/Counter';
import CustomButton from '@/components/common/CustomButton';

const GiftCardDetails = () => {
  const [selected, setSelected] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [quantity, setQuantity] = useState(1)
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

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      {giftCardSignal.value.id && 
        <ScrollView>
          <View className='pb-12'>
            <Image
              source={{uri: giftCardSignal.value.thumbnail}}
              className='w-full h-[200px] opacity-90'
              resizeMode='cover'
            />
            <View className='px-5 pt-6 rounded-2xl bg-white -mt-4'>
              <View className='mb-4'>
                <Text className='text-3xl text-primary font-regular'>{giftCardSignal.value.label}</Text>
                <Text className='text-md text-secondary-800 font-pregular mt-2'>{giftCardSignal.value.address}</Text>
                <Text className='text-xs text-secondary-600 font-regular mt-2'>{giftCardSignal.value.description}</Text>
              </View>
              <View>
                {
                  giftCardSignal.value.priceSet!.map((price, index) => {
                    return <RadioButton 
                      label={price.amount}
                      value={price.amount}
                      status={selected === price.amount ? true : false}
                      className="mt-4"
                      onSelect={() => handleSelect(price.amount)}
                      key={price.id}
                    />
                  })
                }
                <RadioButton 
                  label="other"
                  value='other'
                  status={selected === 'other' ? true : false}
                  className="mt-4"
                  onSelect={() => handleSelect('other')}
                />
              </View>
              <View className='my-4'>
                { (selected === 'other') &&
                  <CustomInput onInput={handleOtherAmount} keyboardType="numeric" placeholder='Other amount' />
                }
              </View>
              <View className='mt-8'>
                <Counter onCount={onCount} />
              </View>
              <View className='mt-16'>
                <CustomButton label='Add to cart' handlePress={addToCart} />
              </View>
            </View>
          </View>
        </ScrollView>
      }
      {!giftCardSignal.value.id && <Redirect href={'/home'} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default GiftCardDetails
