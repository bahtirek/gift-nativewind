import { View, StyleSheet, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../../components/common/CustomButton';
import RadioButton from '../../../components/common/RadioButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import CreditCardForm from '@/components/cart/CreditCardForm';
import ClickForm from '@/components/cart/ClickForm';


const CheckoutModal = () => {
  const [validate, setValidate] = useState(false)
  const [paymentType, setPaymentType] = useState('visa')

  const onReview = () => {
    setValidate(!validate)
  }

  const onPaymentUpdated = (value: boolean) => {
    if(value) router.navigate('/basket/order-review')
  }

  const handleSelect = (value: string) => {
    setPaymentType(value)
  }
 
  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: 'Payment method', headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View className='flex w-full h-full bg-white pt-6' style={styles.container}>
          <View className="flex bg-white px-6 pb-6 flex-1">
            <View className='mb-6 mt-1'>
              <RadioButton 
                label={'Visa / Uzcard / Humo'}
                value={'visa'}
                status={paymentType === 'visa' ? true : false}
                className="mt-4"
                onSelect={() => handleSelect('visa')}
              />
              <RadioButton 
                label={'Click'}
                value={'click'}
                status={paymentType === 'click' ? true : false}
                className="mt-6"
                onSelect={() => handleSelect('click')}
              />
            </View>
            {
              paymentType == 'visa' &&
              <CreditCardForm validate={validate} paymanetUpdated={onPaymentUpdated} />
            }
            {
              paymentType == 'click' &&
              <ClickForm />
            }
            <View className='mt-auto pt-8'>
              <CustomButton label={'Review'} handlePress={onReview} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 50
      }
    })
  },

})

export default CheckoutModal;