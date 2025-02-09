import { Text, View } from 'react-native'
import React from 'react'
import { cartSignal } from '@/signals/cart.signal'


const Basket = () => {
  return (
    <View>
      {
        cartSignal.value.map((item, index) => {
          return (
            <Text key={index}>Basket {item.amount}</Text>
          )
        })
      }
    </View>
  )
}

export default Basket
