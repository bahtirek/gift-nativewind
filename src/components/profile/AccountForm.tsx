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
  const [phone, setPhone] = useState<InputValueType>({value: '', isValid: false});
  const [name, setName] = useState<InputValueType>({value: '', isValid: false});
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneInput = (phone: InputValueType) => {
    setPhone(phone)
  }

  const handleNameInput = (name: InputValueType) => {
    setName(name)
  }

  const onSubmit = () => {
    isFormCompleted();
    if(edit && name.isValid) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false);
        saveAccount(account.phone!, name.value)
        router.replace('/profile/account');
      }, 1000);
    } else if( phone.isValid && name.isValid ) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false);
        setTempAccount(phone.value, name.value)
        router.navigate('/verify-code-modal')
      }, 1000);
    }
  }

  const isFormCompleted = () => {
    if (!edit && (!name.value || !phone.value)) {
      return Alert.alert('Missing data', "Please provide recepient details")
    }
  }

  const nameRules = [
    (val: string) => !!val || 'Name is required',
  ]

  const phoneRules = [
    (val: string) => !!val || 'Phone is required',
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
            onInput={(name: InputValueType) => {handleNameInput(name)}} 
            placeholder='Name'
            rules={nameRules}
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