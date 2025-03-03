import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { paymentSignal } from '@/signals/payment.signal'
import { useCart } from '@/providers/CartProvider'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/common/CustomButton';
import CartItem from '@/components/cart/CartItem';
import CartItemShort from '@/components/cart/CartItemShort';
import { CartItemType } from '@/types';
import { maskCurrency } from '@/utils/masks';


const SubmitOrder = () => {
  const { items } = useCart();
  const [totalAmount, setTotalAmount] = useState('')

  useEffect(() => {
    getTotalAmount();
    console.log(totalAmount);
    
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

  const onSubmit = () => {
    console.log('submit');
    
  }
  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <ScrollView 
        className='px-6 pt-6'
      >
        {
          items.map((item) => {
            return <CartItemShort cartItem={item} className="mb-6" key={item.id}/>
          })
        }
      <View className='flex-row justify-end'>
        <Text className='pr-4 text-md text-secondary-600 font-pregular'>Total:</Text>
        <Text className='text-md text-secondary-900 font-pregular'>{totalAmount}</Text>
      </View>
      <View>
        <Text>{paymentSignal.value.cardholderName}</Text>
        <Text>{paymentSignal.value.creditCard}</Text>
        <Text>{paymentSignal.value.expDate}</Text>
        <Text>{paymentSignal.value.cvv}</Text>
      </View>
      </ScrollView>
      <View className='px-6 pb-6 pt-2'>
        <CustomButton label='Submit' handlePress={onSubmit} />
      </View>
    </SafeAreaView>
  )
}

export default SubmitOrder