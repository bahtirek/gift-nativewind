import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import { validateLength, isEmpty } from '../../utils/input-validation';

const VerifyCodeForm = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('')
  const [codeError, setCodeError] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const phoneToEdit = ''
  const nameToEdit = ''

  const handleCodeInput = (code: string) => {
    if(isValidated) {      
      setCodeError(isEmpty(code))
    }
    setCode(code)
  }

  const handleNameInput = (name: string) => {
    setName(name)
  }

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
            onInput={(code: string) => {handleCodeInput(code)}} 
            placeholder='Verification code'
            keyboardType='number-pad'
            error={codeError}
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