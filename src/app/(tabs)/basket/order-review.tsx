import { View, Text, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { paymentSignal } from '@/signals/payment.signal'
import { useCart } from '@/providers/CartProvider'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/common/CustomButton';
import CartItemShort from '@/components/cart/CartItemShort';
import { maskCurrency } from '@/utils/masks';
import { router, Stack } from 'expo-router';


const SubmitOrder = () => {
  const { items, submitOrder } = useCart();
  const [totalAmount, setTotalAmount] = useState('');
  const [maskedCreditCard, setMaskedCreditCard] = useState('**** **** **** ****');
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    getTotalAmount();
    maskCreditCard(); 
  }, [])
  
  const getTotalAmount = () => {
    const total = items.reduce((total, item) => {
      let amount = '';
      if(item.otherAmount) {
        amount = item.otherAmount.replace(/\s/g, '')
      } else {
        amount = item.amount!.replace(/\s/g, '')
      }
      return total + parseInt(amount)
    }, 0)
    setTotalAmount(maskCurrency(total.toString()))
  }

  const maskCreditCard = () => {
    const lastFour = paymentSignal.value.creditCard!.slice(-4);
    let remaining = paymentSignal.value.creditCard!.slice(0, paymentSignal.value.creditCard!.length - 4);
    remaining = remaining.replace(/\d/g, "*");
    
    setMaskedCreditCard(`${remaining}${lastFour}`)
  }

  const onSubmit = () => {
    setShowModal(true);
    setTimeout(() => {
      if(Math.floor(Math.random() * 10) > 8) {
        Alert.alert('Something went wrong!', 'Please try later', [
          {text: 'OK', onPress: () => router.replace('/basket')},
        ]);
        router.replace('/basket')
      } else {
        submitOrder();
        router.replace('/order-confirmation-modal')
      }
      setShowModal(false)
    }, 1000)
  }
  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: 'Review order', headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <ScrollView className='px-6 pt-6'>
        <Text className='text-xl text-secondary-700 mb-4'>Gift cards:</Text>
        {
          items.map((item) => {
            return <CartItemShort cartItem={item} className="mb-6" key={item.id}/>
          })
        }
      <View className='flex-row justify-end'>
        <Text className='pr-4 text-md text-secondary-600 font-pregular'>Total:</Text>
        <Text className='text-md text-secondary-900 font-pregular'>{totalAmount}</Text>
      </View>
      <Text className='text-xl text-secondary-700 mt-8'>Payment method:</Text>
      <View>
        <View className='mt-4 flex-row justify-between'>
          <Text className='text-xs text-secondary-900 pr-2'>Credit Card #</Text>
          <Text className='text-md text-secondary-600'>{maskedCreditCard}</Text>
        </View>
        <View className='mt-2 flex-row justify-between items-baseline mb-8'>
          <Text className='text-xs text-secondary-900 pr-2'>Exp. Date</Text>
          <Text className='text-md text-secondary-600'>{paymentSignal.value.expDate}</Text>
        </View>
      </View>
      </ScrollView>
      <View className='px-6 pb-6 pt-2'>
        <CustomButton label='Submit order' handlePress={onSubmit} />
      </View>
      <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      >
        <View className='h-full w-full justify-center items-center bg-white/70'>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default SubmitOrder