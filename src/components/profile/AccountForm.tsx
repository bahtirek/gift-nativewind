import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import { validateLength, isEmpty } from '../../utils/input-validation';
import { router, Stack } from 'expo-router';
import LoadingModal from '../common/LoadingModal';
import { useAccount } from '@/providers/AccountProvider';
import { InputValueType } from '@/types';

type AccountPropType = {
  edit?: string
}

const AccountForm = ({edit}: AccountPropType) => {
  const { account, setTempAccount, saveAccount } = useAccount();
  const [phone, setPhone] = useState<InputValueType>({value: '', isValid: true});
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneInput = (phone: InputValueType) => {
    setPhone(phone)
  }

  const handleNameInput = (name: string) => {
    if(isValidated) {
      setNameError(isEmpty(name))
    }
    setName(name)
  }

  const onSubmit = () => {
    validateData();
    if(edit && !nameError && !!name) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false);
        saveAccount(account.phone!, name)
        router.replace('/profile/account');
      }, 1000);
    } else if( phone.isValid && !nameError && !!phone.value && !!name ) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false);
        setTempAccount(phone.value, name)
        router.navigate('/verify-code-modal')
      }, 1000);
    }
  }

  const validateData = () => {
    setIsValidated(true);

    if (!edit && !name && !phone) {
      return Alert.alert('Missing data', "Please provide recepient details")
    }

    setNameError(isEmpty(name))
  }

  const phoneRules = [
    (val: string) => validateLength(val, 12) || 'Wrong phone number'
  ]

  return (
    <View className='h-full justify-between'>
      <View className=''>
        {
          !(!!edit) &&
          <Text className='text-xl text-secondary-700 mt-3 mb-6'>Create account</Text>
        }
        {
          !!edit &&
          <Text className='text-xl text-secondary-700 mt-3 mb-6'>Edit name</Text>
        }
        <View className='mb-6 mt-1'>
          <CustomInput 
            onInput={(name: string) => {handleNameInput(name)}} 
            placeholder='Name'
            error={nameError}
            presetValue={edit}
          />
        </View>
        {
          !(!!edit) &&
          <View className='mb-6 mt-1'>
            <CustomInput 
              onInput={(phone: InputValueType) => {handlePhoneInput(phone)}} 
              placeholder='Phone'
              mask='phone' 
              maxLength={12}
              keyboardType='number-pad'
              rules={phoneRules}
            />
          </View>
        }
      </View>
      <View className='mt-10'>
        <CustomButton label='Submit' handlePress={onSubmit} />
      </View>
      <LoadingModal isLoading={isLoading} />
    </View>
  )
}

export default AccountForm