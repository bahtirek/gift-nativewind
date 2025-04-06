import { View, Text, StyleSheet, Platform, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton';
import RadioButton from './RadioButton';
import CustomInput from './CustomInput';
import { giftCardSignal, setGiftCard } from '@/signals/giftcards.signal';
import { validateAmount, validateEmail, validateLength } from '../../utils/input-validation';
import { useCart } from '@/providers/CartProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, Stack } from 'expo-router';
import { InputValueType } from '@/types';


const PurchaseDetails = ({ handleButtonPress }: any) => {
  const { addItemToEdit, cartItemToEdit } = useCart();

  useEffect(() => {
    if(cartItemToEdit.id) {
      if(cartItemToEdit.otherAmount) {
        setOtherAmount({value: cartItemToEdit.otherAmount});
        setSelectedAmount('other');
      } else {
        setSelectedAmount(cartItemToEdit.amount!);
      }
      if(cartItemToEdit.email) setEmail({value: cartItemToEdit.email});
      if(cartItemToEdit.phone) setPhone({value: cartItemToEdit.phone});
      if(cartItemToEdit.note) setNote({value: cartItemToEdit.note});
    } else {
      resetForm()
    }
  }, [])
  const [selectedAmount, setSelectedAmount] = useState('');
  const [otherAmount, setOtherAmount] = useState<InputValueType>({value: '', isValid: true});
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState<InputValueType>({value: '', isValid: true});
  const [phone, setPhone] = useState<InputValueType>({value: '', isValid: true});
  const [note, setNote] = useState<InputValueType>({value: '', isValid: true});
  const { addItem } = useCart();

  let minAmount = '';
  if (giftCardSignal.value.priceSet) {
    minAmount = giftCardSignal.value.priceSet[0].amount;
  }

  const handleSelect = (amount: string) => {
    setSelectedAmount(amount);
    if(amount != 'other') setOtherAmount({value: ''});
  }

  const handleEmailInput = (email: InputValueType) => {
    setEmail(email)
  }

  const handleNoteInput = (note: InputValueType) => {
    setNote(note)
  }

  const handlePhoneInput = (phone: InputValueType) => {
    setPhone(phone)
  }

  const handleAmountInput = (amount: InputValueType) => {
    setOtherAmount(amount)
  }

  const addToCart = () => {
    isFormCompleted();
    const amount = otherAmount.value ? otherAmount.value : selectedAmount;
    if(
      ((amount && amount != "other") || otherAmount.isValid) &&
      (email.isValid || phone.isValid)
    ) {
      const id = cartItemToEdit.id ? cartItemToEdit.id : '';
      console.log(note);
      
      addItem(quantity, amount, giftCardSignal.value, email.value, phone.value, note.value, otherAmount.value, id);
      addItemToEdit({});
      setGiftCard({});
      resetForm();
      handleButtonPress();
    }
  }

  const resetForm =() => {
    setSelectedAmount('');
    setOtherAmount({value: ''});
    setEmail({value: ''});
    setPhone({value: ''});
    setNote({value: ''});
  }

  const isFormCompleted = () => {
    if(!selectedAmount) {
      console.log('Missing data', "Please select amount")
      return Alert.alert('Missing data', "Please select amount")
    }

    if (selectedAmount == 'other') {
      if(!otherAmount.value) {
        console.log('Missing data', "Please select amount")
        return Alert.alert('Missing data', "Please select amount")
      }
    }

    if (!email.value && !phone.value) {
      console.log('Missing data', "Please provide recepient details")
      return Alert.alert('Missing data', "Please provide recepient details")
    }   
  }

  const phoneRules = [
    (val: string) => validateLength(val, 12) || 'Wrong phone number'
  ]

  const emailRules = [
    (val: string) => validateEmail(val) || 'Wrong email format'
  ]

  const amountRules = [
    (val: string) => validateAmount(val, minAmount) || `Amount can't be less than ${minAmount}`
  ]

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `${giftCardSignal.value?.label}`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      {giftCardSignal.value.id  &&
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View className='flex w-full h-full bg-white pt-6' style={styles.container}>
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
                <CustomInput 
                  onInput={(amount: InputValueType) => {handleAmountInput(amount)}} 
                  keyboardType="number-pad" 
                  placeholder='Other amount' 
                  mask='currency'
                  presetValue={cartItemToEdit.otherAmount}
                  rules={amountRules}
                />
              }
            </View>
            <Text className='text-xl text-secondary-700 mb-2'>Recepient details:</Text>
            <View className='mt-2'>
              <CustomInput 
                onInput={(phone: InputValueType) => {handlePhoneInput(phone)}} 
                placeholder='Phone'
                mask='phone' 
                maxLength={12}
                keyboardType='number-pad'
                presetValue={cartItemToEdit.phone}
                rules={phoneRules}
              />
            </View>
            <Text className='text-xl text-secondary-700 my-4'>Or</Text>
            <View className=''>
              <CustomInput 
                onInput={(email: InputValueType) => {handleEmailInput(email)}} 
                placeholder='Email'
                keyboardType='email-address'
                presetValue={cartItemToEdit.email}
                rules={emailRules}
              />
            </View>
            <Text className='text-xl text-secondary-700 my-4'>Gift note:</Text>
            <View>
              <CustomInput 
                onInput={(note: InputValueType) => {handleNoteInput(note)}} 
                placeholder='Best wishes'
                multiline={true}
                numberOfLines={10}
                presetValue={cartItemToEdit.note}
                style={{ 
                  height: 100,
                  textAlignVertical: 'top',
                  paddingTop: 9,
                  paddingBottom: 9
                }}
              />
            </View>
            <View className='mt-auto pt-8'>
              <CustomButton label={'Add to cart'} handlePress={addToCart}/>
            </View>
          </View>
        </View>
      </ScrollView>
      }
      {!giftCardSignal.value.id && <Redirect href={'/home'} />}
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
  dropdown: {
    ...Platform.select({
      android: {
        marginLeft: -15
      }
    })
  }
})

export default PurchaseDetails;