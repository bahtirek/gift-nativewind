import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { giftCardSignal, setGiftCard } from '@/signals/giftcards.signal';

const GiftCardDetails = () => {
  return (
    <View>
      <Text>{giftCardSignal.value.label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default GiftCardDetails
