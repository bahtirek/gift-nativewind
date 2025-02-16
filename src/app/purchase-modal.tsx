import { View, Text, Modal, Image, StyleSheet, Pressable, Platform, GestureResponderEvent, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/common/CustomButton';
import RadioButton from '../components/common/RadioButton';
import CustomInput from '../components/common/CustomInput';
import { giftCardSignal } from '@/signals/giftcards.signal';
import { validateAmount, validateEmail, validateLength } from '../utils/input-validation';
import { useCart } from '@/providers/CartProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';


const PurchaseModal = () => {
  const { cartItemToEdit } = useCart();

  useEffect(() => {
    if(cartItemToEdit.id) {
      if(cartItemToEdit.otherAmount) {
        setOtherAmount(cartItemToEdit.otherAmount);
        setSelectedAmount('other');
      } else {
        setSelectedAmount(cartItemToEdit.amount!);
      }
      if(cartItemToEdit.email) setEmail(cartItemToEdit.email);
      if(cartItemToEdit.phone) setPhone(cartItemToEdit.phone);
      if(cartItemToEdit.note) setNote(cartItemToEdit.note);
    } else {
      setSelectedAmount('');
      setOtherAmount('');
      setEmail('');
      setPhone('');
      setNote('');
    }
  }, [])
  const [selectedAmount, setSelectedAmount] = useState('');
  const [otherAmount, setOtherAmount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState<null | string>(null);
  const [phoneError, setPhoneError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [note, setNote] = useState('');
  const { addItem } = useCart();

  let minAmount = '';
  if (giftCardSignal.value.priceSet) {
    minAmount = giftCardSignal.value.priceSet[0].amount;
  }

  const handleSelect = (amount: string) => {
    setSelectedAmount(amount);
    if(amount != 'other') setOtherAmount('');
  }

  const handleEmailInput = (email: string) => {
    if(isValidated) {
      setEmailError(validateEmail(email))
    }
    setEmail(email)
  }

  const handleNoteInput = (note: string) => {
    setNote(note)
  }

  const handlePhoneInput = (phone: string) => {
    if(isValidated) {
      setPhoneError(validateLength(phone, 12))
    }
    setPhone(phone)
  }

  const handleAmountInput = (amount: string) => {
    if(isValidated) {
      setAmountError(validateAmount(amount, minAmount));
    }
    setOtherAmount(amount)
  }

  const addToCart = () => {
    validateData();
    const amount = otherAmount ? otherAmount : selectedAmount;
    if((amount && amount != "other") && (email || phone) && !emailError && !phoneError && !amountError) {
      const id = cartItemToEdit.id ? cartItemToEdit.id : '';
      console.log(quantity, amount, giftCardSignal.value, email, phone, note, otherAmount, id);
      addItem(quantity, amount, giftCardSignal.value, email, phone, note, otherAmount, id);
      router.back();
    }
  }

  const validateData = () => {
    setIsValidated(true)
    if(!selectedAmount) {
      return Alert.alert('Missing data', "Please select amount")
    }

    if (selectedAmount == 'other') {
      if(!otherAmount) {
        return Alert.alert('Missing data', "Please select amount")
      } else {
        setAmountError(validateAmount(otherAmount, minAmount));
      }
    }

    if (!email && !phone) {
      return Alert.alert('Missing data', "Please provide recepient details")
    } 
    if(phone) {
      setPhoneError(validateLength(phone, 12))
    } 
    if(email){
      setEmailError(validateEmail(email));
    }    
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `${giftCardSignal.value.label}`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <ScrollView>
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
                  onInput={(amount: string) => {handleAmountInput(amount)}} 
                  keyboardType="number-pad" 
                  placeholder='Other amount' 
                  mask='currency'
                  error={amountError}
                  presetValue={cartItemToEdit.otherAmount}
                />
              }
            </View>
            <Text className='text-xl text-secondary-700 mb-2'>Recepient details:</Text>
            <View className='mt-2'>
              <CustomInput 
                onInput={(email: string) => {handleEmailInput(email)}} 
                placeholder='Email'
                keyboardType='email-address'
                error={emailError}
                presetValue={cartItemToEdit.email}
              />
            </View>
            <Text className='text-xl text-secondary-700 my-4'>Or</Text>
            <View className=''>
              <CustomInput 
                onInput={(phone: string) => {handlePhoneInput(phone)}} 
                placeholder='Phone'
                mask='phone' 
                maxLength={12}
                keyboardType='number-pad'
                error={phoneError}
                presetValue={cartItemToEdit.phone}
              />
            </View>
            <Text className='text-xl text-secondary-700 my-4'>Gift note:</Text>
            <View className='mb-12'>
              <CustomInput 
                onInput={(note: string) => {handleNoteInput(note)}} 
                placeholder='Best wishes'
                error={phoneError}
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
            <View className='mt-auto'>
              <CustomButton label={'Add to cart'} handlePress={addToCart}/>
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
  dropdown: {
    ...Platform.select({
      android: {
        marginLeft: -15
      }
    })
  }
})

export default PurchaseModal;