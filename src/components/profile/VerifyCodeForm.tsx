import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import { InputValueType } from '@/types';

const VerifyCodeForm = () => {
  const [code, setCode] = useState<InputValueType>({value: '', isValid: true});

  const handleCodeInput = (code: InputValueType) => {
    setCode(code)
  }

  const codeRules = [
    (val: string) => !!val || 'Field is required',
  ]

  const sendCode = () => {
     
  }

  const resendCode = () => {
    
  }

  return (
    <View className='h-full justify-between'>
      <View>
        <Text className='text-xl text-secondary-700 mt-3 mb-6'>Verify account</Text>
        <View className='mb-6 mt-1'>
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
  )
}

export default VerifyCodeForm