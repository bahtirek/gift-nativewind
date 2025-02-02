import { View, Text, Modal, Image, StyleSheet, Pressable, Platform, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import CustomButton from './common/CustomButton';
import { giftCardSignal } from '@/signals/giftcards.signal';
import RadioButton from './common/RadioButton';
import CustomInput from './common/CustomInput';
import Counter from './common/Counter';
import { addItemToCart } from '@/signals/cart.signal';
//import { addItemToCart }

const PurchaseModal = ( {showPurchaseModal, closeModal, handlePurchase}: any) => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const handleSelect = (amount: string) => {
    setSelectedAmount(amount);
  }
  const handleOtherAmount = (e: any) => {
    setOtherAmount(e);
  }

  const onCount = (quantity: number) => {
    setQuantity(quantity)
  }

  const addToCart = () => {
    const amount = otherAmount ? otherAmount : selectedAmount;
    addItemToCart(quantity, amount, giftCardSignal.value);
    closeModal();
  }
  return (
    <Modal
      animationType="slide"
      visible={showPurchaseModal}
      >
      <View className='flex w-full h-full bg-white' style={styles.container}>
        <View className='flex items-end'>
          <Pressable onPress={closeModal as (e?: GestureResponderEvent) => void} className="p-4">
            <Image 
              source={icons.cancel}
              className='!w-5 !h-5'
              resizeMode='contain'
            />
          </Pressable>
        </View>
        <View className="flex bg-white px-8 pb-10 flex-1">
          <Text className='text-xl text-secondary-700 mb-2'>Choose amount</Text>
          <View>
              {
                giftCardSignal.value.priceSet!.map((price, index) => {
                  return <RadioButton 
                    label={price.amount}
                    value={price.amount}
                    status={selectedAmount === price.amount ? true : false}
                    className="mt-4"
                    onSelect={() => handleSelect(price.amount)}
                    key={price.id}
                  />
                })
              }
              <RadioButton 
                label="other"
                value='other'
                status={selectedAmount === 'other' ? true : false}
                className="mt-4"
                onSelect={() => handleSelect('other')}
              />
          </View>
          <View className='my-4'>
            { (selectedAmount === 'other') &&
              <CustomInput onInput={handleOtherAmount} keyboardType="numeric" placeholder='Other amount' />
            }
          </View>
          <View className='mt-auto'>
            <View className='pb-10'>
              <Counter onCount={onCount} />
            </View>
            <CustomButton label={'Add to cart'} handlePress={addToCart}/>
          </View>
        </View>
      </View>
    </Modal>
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
  dropdown: {
    ...Platform.select({
      android: {
        marginLeft: -15
      }
    })
  }
})

export default PurchaseModal