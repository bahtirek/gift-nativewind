import { View, Text, FlatList, Image, RefreshControl, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";

import CategoryList from '@/components/category/CategoryList';
import GiftCard from '@/components/GiftCard';
import icons from '@constants/icons';
import SearchInput from '@/components/search/SearchInput';
import { GiftCardType } from '@/types';
import allGiftCards from '@assets/data/allcards';

export default function Home() {
  const [items, setItems] = useState<GiftCardType[]>([]);
  const [giftCards, setGiftCards] = useState<GiftCardType[]>([])
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    api();
  }, [])

  const api = () => {
    /* setLoading(true)
    const url = "https://jsonplaceholder.typicode.com/posts"
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setItems(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)); */
    setTimeout(() => {

      setGiftCards(allGiftCards);
    }, 2000)
  }

/*   if (loading) {
    return <ActivityIndicator />;
  } */

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList 
        className='px-6'
        data={giftCards}
        keyExtractor={(item) => item.id!}
        renderItem={({item}) => (
          <GiftCard giftCard={item} className="mb-6" />
        )}
        ListHeaderComponent={() => (
          <View className='mt-6 space-y-6'>
            <View className='justify-between items-center flex-row mb-6'>
              <View className=''>
                {/* <Text className='text-xs font-pregular text-gray-600'>Unwrap Joy, Anytime, Anywhere!</Text> */}
                <Text className='text-sm font-pregular text-gray-600'>Your One-Stop Gift Card Shop!</Text>
                <Text className='text-3xl font-psemibold text-primary'>GiftCard Genie</Text>
              </View>
              <View>
                <Image 
                  source={icons.giftCard}
                  className='!w-20 !h-14'
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput />

            <View className='w-full flex-1 pt-8'>
              <CategoryList />

              <Text className='text-primary text-2xl font-regular my-5'>Trending</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className='text-secondary-700 text-lg'>Loading...</Text>
        )}
        keyboardDismissMode='on-drag'
      />
      <StatusBar backgroundColor="#FFFBFA" style="dark" />
    </SafeAreaView>
  );
}
