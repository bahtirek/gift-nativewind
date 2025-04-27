import { View, Text } from 'react-native'
import React, { useEffect, useState, useCallback} from 'react'
import { Stack, useFocusEffect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import AccountForm from '@/components/profile/AccountForm';
import { useAccount } from '@/providers/AccountProvider';
import CustomButton from '@/components/common/CustomButton';
import { maskCurrency } from '@/utils/masks';
import allGiftCards from '@assets/data/allcards';

const Dashboard = () => {
  
  const [giftCard, setGiftCard] = useState(allGiftCards[0])

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <Stack.Screen options={{title: `Dashboard`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <View className='p-6 h-full'>
        <View className='justify-between h-full'>
          <View>
            <View>
                <Text className='text-lg text-secondary-800 font-pregular'>Gift cards:</Text>
                {
                  giftCard.priceSet!.map((price, index) => {
                    return (
                      <View className='flex flex-row justify-between mt-2 pl-4' key={price.id}>
                        <Text className='text-lg text-secondary-600 font-pregular'>{price.amount}</Text>
                        <Text className='text-lg text-secondary-900 font-pregular'>3</Text>
                      </View>
                    )
                  })
                }
                <View className='flex flex-row justify-between mt-2 pl-4'>
                  <Text className='text-lg text-secondary-600 font-pregular'>Other</Text>
                  <Text className='text-lg text-secondary-900 font-pregular'>1</Text>
                </View>
            </View>
            <View className='flex flex-row justify-between mt-4'>
              <Text className='text-lg text-secondary-600 font-pregular'>Balance:</Text>
              <Text className='text-lg text-secondary-900 font-pregular'>{maskCurrency('10000000')}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Dashboard;