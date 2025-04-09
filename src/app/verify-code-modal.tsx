import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';
import { validateLength } from '../utils/input-validation';
import { router, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAccount } from '@/providers/AccountProvider';
import { InputValueType } from '@/types';

const VerifyCode = () => {
  const [code, setCode] = useState<InputValueType>({value: '', isValid: true});
  const { saveTempAccount } = useAccount();

  const handleCodeInput = (code: InputValueType) => {
    setCode(code)
  }

  const sendCode = () => {
    if(!code.value) {
      console.log('Missing data', "Please provide verification code");
      
      return Alert.alert('Missing data', "Please provide verification code");
    } 
    
    if(code.isValid){
      setTimeout(() => {
        saveTempAccount();
        router.navigate('/profile/account')
      })
    }
  }

  const resendCode = () => {
    
  }

  const codeRules = [
    (val: string) => !!val || 'Field is required',
    (val: string) => validateLength(val, 6) || 'Code must be 6 digits'
  ]

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Verify account`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'} } />
      <View className='h-full justify-between p-6'>
        <View>
          <View className='mb-6 mt-8'>
            <CustomInput 
              onInput={(code: InputValueType) => {handleCodeInput(code)}} 
              placeholder='Verification code'
              keyboardType='number-pad'
              rules={codeRules}
            />
          </View>
        </View>
        <View>
          <CustomButton label='Verify' handlePress={sendCode} />
          <View className='mt-6 mb-4'>
            <TouchableOpacity onPress={resendCode} activeOpacity={0.5}>
              <Text className='text-xl text-primary-700 underline text-center'>Resend code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default VerifyCode