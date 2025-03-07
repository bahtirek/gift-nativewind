import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';
import { isEmpty } from '../utils/input-validation';
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const handleCodeInput = (code: string) => {
    if(isValidated) {      
      setCodeError(isEmpty(code))
    }
    setCode(code)
  }

  const sendCode = () => {
     
  }

  const resendCode = () => {
    
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Verify account`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'} } />
      <View className='h-full justify-between p-6'>
        <View>
          <View className='mb-6 mt-8'>
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
    </SafeAreaView>
  )
}

export default VerifyCode