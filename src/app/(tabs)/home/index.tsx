import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";

import CategoryList from '@/components/CategoryList/CategoryList';
import giftCards from '@assets/data/giftcards';
import GiftCard from '@/components/GiftCard';
import icons from '@constants/icons';
import SearchInput from '@/components/common/SearchInput';
import { Href, router } from 'expo-router';

export default function TabOneScreen() {
  const trendingCards = giftCards;
  const goToSearchScreen = () => {
    router.push('/allcards' as Href);
  }
  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList 
        className='px-5'
        data={trendingCards}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <GiftCard giftCard={item} className="mb-5" />
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

            <SearchInput handleSearchQuery={goToSearchScreen}/>

            <View className='w-full flex-1'>
              <CategoryList />

              <Text className='text-primary text-2xl font-regular mt-4 mb-3'>Trending</Text>
            </View>
          </View>
        )}
        keyboardDismissMode='on-drag'
      />
      <StatusBar backgroundColor="#FFFBFA" style="dark" />
    </SafeAreaView>
  );
}
