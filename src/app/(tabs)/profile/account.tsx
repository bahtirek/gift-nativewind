import { View, Text } from 'react-native'
import React, { useEffect, useState} from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountForm from '@/components/profile/AccountForm';
import { useAccount } from '@/providers/AccountProvider';

const Account = () => {
  const { account } = useAccount();
  const [name, setName] = useState('');
  const [isAccountExist, setIsAccountExist] = useState<boolean | null>(null);

  useEffect(() => {
    if(account.phone) {
      setIsAccountExist(true);
    } else {
      setIsAccountExist(false);
    }
  }, [])


  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Account`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <View className='p-6 h-full'>
        { 
          isAccountExist != null && !isAccountExist &&
          <AccountForm edit={name} />
        }
        { 
          isAccountExist != null && isAccountExist &&
          <Text>{account.phone}</Text>
        }
      </View>
    </SafeAreaView>
  )
}

export default Account