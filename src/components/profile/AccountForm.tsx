import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../common/CustomButton';
import CustomInput from '../common/CustomInput';
import { validateLength, isEmpty } from '../../utils/input-validation';
import { router, Stack } from 'expo-router';
import LoadingModal from '../common/LoadingModal';
import { useAccount } from '@/providers/AccountProvider';

type AccountPropType = {
  edit?: string
}

const AccountForm = ({edit}: AccountPropType) => {
  const { account, setTempAccount } = useAccount();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('')
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('')
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nameToEdit = ''

  const handlePhoneInput = (phone: string) => {
    if(isValidated) {
      setPhoneError(validateLength(phone, 12, 'Wrong phone number'))
    }
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
        router.back();
      }, 1000);
    } else if( !phoneError && !nameError && !!phone && !!name ) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false);
        setTempAccount(phone, name)
        router.navigate('/verify-code-modal')
      }, 1000);
    }
  }

  const validateData = () => {
    setIsValidated(true);

    if (!edit && !name && !phone) {
      return Alert.alert('Missing data', "Please provide recepient details")
    }

    if(phone) {
      setPhoneError(validateLength(phone, 12, 'Wrong phone number'))
    } else {
      setPhoneError(isEmpty(phone))
    }
    setNameError(isEmpty(name))
  }

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
              onInput={(phone: string) => {handlePhoneInput(phone)}} 
              placeholder='Phone'
              mask='phone' 
              maxLength={12}
              keyboardType='number-pad'
              error={phoneError}
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