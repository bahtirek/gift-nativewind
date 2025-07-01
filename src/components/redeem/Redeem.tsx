import { View, Text, StyleSheet, Platform, Alert, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import CustomButton from '@components/common/CustomButton';
import CustomInput from '@components/common/CustomInput';
import { validateRedeemAmount } from '../../utils/input-validation';
import { InputValueType } from '@/types';
import { maskCurrency } from '@/utils/masks';
import { useFocusEffect } from 'expo-router';


const Redeem = ({ balance, token, amount, onRedeemedCompleted, onRefund }: any) => {
  const [redeemAmount, setRedeemAmount] = useState<InputValueType>({value: '', isValid: true});
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [remainingBalance, setRemainingBalance] = useState<string>('')

  useFocusEffect(
    useCallback(() => {
      resetForm()
    }, [])
  );

  const handleAmountInput = (amount: InputValueType) => {
    setRedeemAmount(amount)
  }

  const onRedeem = () => {
    isFormCompleted();
    if(redeemAmount.value && redeemAmount.isValid) {
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
        const remBalance = amount - parseInt(redeemAmount.value.replace(/\s/g, ''))
        setRemainingBalance(remBalance.toString());
        setShowSuccessModal(true)
        //setShowErrorModal(true)
      }, 2000);
      
    }
  }

  const resetForm =() => {
    setRedeemAmount({value: ''});
  }

  const isFormCompleted = () => {
    if(!redeemAmount.value) {
      console.log('Missing data', "Please select amount")
      return Alert.alert('Missing data', "Please select amount")
    }
  }

  const redeemed = () => {
    onRedeemedCompleted(true)
  }

  const amountRules = [
    (val: string) => validateRedeemAmount(val, balance) || `Amount can't be more than ${balance}`
  ]

  return (
    <View className='flex w-full h-full bg-white pt-6' style={styles.container}>
      <View className="flex bg-white px-6 pb-10 flex-1">
        <View className='flex flex-row justify-between mb-2 mt-4'>
          <Text className='text-lg text-secondary-600 font-pregular'>Gift card amount:</Text>
          <Text className='text-lg text-secondary-900 font-pregular'>{maskCurrency(amount)}</Text>
        </View>
        <View className='flex flex-row justify-between mb-4'>
          <Text className='text-lg text-secondary-600 font-pregular'>Balance:</Text>
          <Text className='text-lg text-secondary-900 font-pregular'>{maskCurrency(balance)}</Text>
        </View>
        <TouchableOpacity onPress={onRefund}>
          <Text className='text-sm text-primary-700 text-left'>Last transaction details</Text>
        </TouchableOpacity>
        <View className='mt-4 mb-6'>
          <CustomInput 
            onInput={(amount: InputValueType) => {handleAmountInput(amount)}} 
            keyboardType="number-pad" 
            placeholder='Redeem amount' 
            mask='currency'
            rules={amountRules}
          />
        </View>
        <View className='mt-auto pt-8'>
          <CustomButton label={'Redeem'} handlePress={onRedeem}/>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        <View className='h-full w-full justify-center items-center bg-black/40 pb-16'>
        <View className=''>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
      >
        <View className='h-full w-full justify-center items-center bg-black/40 pb-16'>
          <View className='w-[85%] p-6 rounded-xl bg-white'  style={styles.shadow}>
            <Text className='text-xl text-primary-700 font-pregular mb-6'>Redeemed!</Text>
            <View className='flex flex-row justify-between mb-12'>
              <Text className='text-lg text-secondary-600 font-pregular'>Remaining balance:</Text>
              <Text className='text-lg text-secondary-900 font-pregular'>{maskCurrency(remainingBalance)}</Text>
            </View>
            <CustomButton label='OK' handlePress={redeemed} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showErrorModal}
      >
        <View className='h-full w-full justify-center items-center bg-black/40 pb-16'>
          <View className='w-[85%] p-6 rounded-xl bg-white'  style={styles.shadow}>
            <Text className='text-xl text-primary-700 font-pregular mb-6'>Oops!</Text>
            <View className='flex flex-row justify-between mb-12'>
              <Text className='text-lg text-secondary-600 font-pregular'>Couldn't redeem. Please try again.</Text>
            </View>
            <CustomButton label='Rescan' handlePress={redeemed} />
          </View>
        </View>
      </Modal>
    </View>
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
  },
  phonePrefix: {
    paddingLeft: 30
  },
  shadow: {
    shadowColor: "rgba(152, 152, 152, 0.5)",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
})

export default Redeem;