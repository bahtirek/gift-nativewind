import { View, Text } from 'react-native'
import React, { useEffect, useState, useCallback} from 'react'
import { Stack, useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountForm from '@/components/profile/AccountForm';
import { useAccount } from '@/providers/AccountProvider';
import CustomButton from '@/components/common/CustomButton';

const Account = () => {
  const { account } = useAccount();
  const [editName, setEditName] = useState('');
  const [showAccountForm, setShowAccountForm] = useState<boolean | null>(null);

  useEffect(() => {
    toggleAccountForm()
  }, [])

  useFocusEffect(
    useCallback(() => {
      toggleAccountForm();
      setEditName('')
    }, [account])
  );

  const toggleAccountForm = () => {
    if(account.phone) {
      setShowAccountForm(false);
    } else {
      setShowAccountForm(true);
    }
  }

  const onEdit = () => {
    setEditName(account.name!);
    setShowAccountForm(true)
  }


  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Account`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <View className='p-6 h-full'>
        { 
          showAccountForm != null && showAccountForm &&
          <AccountForm edit={editName} />
        }
        { 
          showAccountForm != null && !showAccountForm &&
          <View className='justify-between h-full'>
            <View>
              <View className='flex flex-row justify-between mt-4'>
                <Text className='text-lg text-secondary-600 font-pregular'>Name:</Text>
                <Text className='text-lg text-secondary-900 font-pregular'>{account.name}</Text>
              </View>
              <View className='flex flex-row justify-between mt-4'>
                <Text className='text-lg text-secondary-600 font-pregular'>Phone:</Text>
                <Text className='text-lg text-secondary-900 font-pregular'>{account.phone}</Text>
              </View>
            </View>
            <View>
              <CustomButton label='Edit name' handlePress={onEdit} />
            </View>
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default Account