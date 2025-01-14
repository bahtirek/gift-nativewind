import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
//import SearchInput from '@components/SearchInput'
//import EmptyState from '@components/common/EmptyState'
//import GiftCard from '@components/GiftCard'
import CardListItem from '@/components/CardListItem';
import CategoryList from '@/components/CategoryList/CategoryList';
import giftCards from '@assets/data/giftcards';
import GiftCard from '@/components/GiftCard';
import icons from '@constants/icons';

export default function TabOneScreen() {
  const trendingCards = giftCards;
  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList 
        data={trendingCards}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <GiftCard giftCard={item} />
        )}
        ListHeaderComponent={() => (
          <View className='mt-6 px-4 space-y-6'>
            <View className='justify-between items-center flex-row mb-6'>
              <View className=''>
                {/* <Text className='text-xs font-pregular text-gray-600'>Unwrap Joy, Anytime, Anywhere!</Text> */}
                <Text className='text-xs font-pregular text-gray-600'>Your One-Stop Gift Card Shop!</Text>
                <Text className='text-2xl font-psemibold text-orange-500'>GiftCard Genie</Text>
              </View>
              <View>
                <Image 
                  source={icons.giftCard}
                  className='!w-20 !h-14'
                  resizeMode='contain'
                />
              </View>
            </View>

            {/* <SearchInput /> */}


            <View className='w-full flex-1'>
              <CategoryList />

              <Text className='text-orange-500 text-lg font-pregular mt-7'>Trending</Text>
            </View>
          </View>
        )}
        keyboardDismissMode='on-drag'
      />
    </SafeAreaView>
  );
}
