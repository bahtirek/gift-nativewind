import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { giftCardSignal, setGiftCard } from '@/signals/giftcards.signal';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioButton from '@/components/common/RadioButton';
import CustomInput from '@/components/common/CustomInput';
import { useRootNavigationState, Redirect } from 'expo-router';

const GiftCardDetails = () => {
  const [selected, setSelected] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const handleSelect = (amount: string) => {
    setSelected(amount);
  }

  const handleOtherAmount = (e: any) => {
    setOtherAmount(e);
    console.log(otherAmount);
    
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      {giftCardSignal.value.id && 
        <View>
          <Image
            source={{uri: giftCardSignal.value.thumbnail}}
            className='w-full h-[250px] opacity-90'
            resizeMode='cover'
          />
          <View className='px-5 pt-6 rounded-2xl bg-white -mt-4'>
            <View className=''>
              <Text className='text-3xl text-primary font-regular'>{giftCardSignal.value.label}</Text>
              <Text className='text-md text-secondary-800 font-pregular mt-2'>{giftCardSignal.value.address}</Text>
              <Text className='text-xs text-secondary-600 font-regular mt-2'>{giftCardSignal.value.description}</Text>
            </View>
            <View>
              <RadioButton 
                label="100.000"
                value='100.000'
                status={selected === '100.000' ? true : false}
                className="mt-4"
                onSelect={() => handleSelect('100.000')}
              />
              <RadioButton 
                label="200.000"
                value='200.000'
                status={selected === '200.000' ? true : false}
                className="mt-4"
                onSelect={() => handleSelect('200.000')}
              />
              <RadioButton 
                label="300.000"
                value='300.000'
                status={selected === '300.000' ? true : false}
                className="mt-4"
                onSelect={() => handleSelect('300.000')}
              />
              <RadioButton 
                label="other"
                value='other'
                status={selected === 'other' ? true : false}
                className="mt-4"
                onSelect={() => handleSelect('other')}
              />
            </View>
            <View>
              { (selected === 'other') &&
                <CustomInput onInput={handleOtherAmount} placeholder='Other amount' />
              }
            </View>
          </View>
        </View>
      }
      {!giftCardSignal.value.id && <Redirect href={'/home'} />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default GiftCardDetails
