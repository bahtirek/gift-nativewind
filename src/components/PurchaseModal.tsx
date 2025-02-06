import { View, Text, Modal, Image, StyleSheet, Pressable, Platform, GestureResponderEvent, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import icons from '@constants/icons';
import CustomButton from './common/CustomButton';
import { giftCardSignal } from '@/signals/giftcards.signal';
import RadioButton from './common/RadioButton';
import CustomInput from './common/CustomInput';
import { addItemToCart } from '@/signals/cart.signal';
//import { addItemToCart }

const PurchaseModal = ( {showPurchaseModal, closeModal, handlePurchase}: any) => {
  useEffect(() => {
    console.log('effect');
    if(showPurchaseModal) {
      setSelectedAmount('');
      setOtherAmount('');
      setEmail('');
      setPhone('');
    }
  }, [showPurchaseModal])
  const [selectedAmount, setSelectedAmount] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSelect = (amount: string) => {
    setSelectedAmount(amount);
  }
  const handleOtherAmount = (e: any) => {
    setOtherAmount(e);
  }

  const addToCart = () => {
    console.log(otherAmount, selectedAmount);
    
    const amount = otherAmount ? otherAmount : selectedAmount;
    if(amount && amount != "other") {
      addItemToCart(quantity, amount, giftCardSignal.value, email, phone);
      closeModal();
    } else {
      return (
        Alert.alert('Missing ammount', "Please choose or enter gift card amount!")     
      )
    }
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
          <View className='mt-4 mb-6'>
            { (selectedAmount === 'other') &&
              <CustomInput onInput={handleOtherAmount} keyboardType="numeric" placeholder='Other amount' mask='currency' />
            }
          </View>
          <Text className='text-xl text-secondary-700 mb-2'>Recepient details</Text>
          <View className='mt-2'>
            <CustomInput onInput={(email: string) => {setEmail(email)}} placeholder='Email' />
          </View>
          <Text className='text-xl text-secondary-700 my-4'>Or</Text>
          <View className=''>
            <CustomInput onInput={(phone: string) => {setPhone(phone)}} placeholder='Phone' keyboardType="numeric" mask='phone' maxLength='12' />
          </View>
          <View className='mt-auto'>
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