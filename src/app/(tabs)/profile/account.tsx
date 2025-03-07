import { View, Text } from 'react-native'
import React, { useState} from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountForm from '@/components/profile/AccountForm';

const Account = () => {
  const [name, setName] = useState('')

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Account`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <View className='p-6 h-full'>
        <AccountForm edit={name} />
      </View>
    </SafeAreaView>
  )
}

export default Account