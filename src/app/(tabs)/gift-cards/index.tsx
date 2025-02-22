import { FlatList, View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GiftCard from '@/components/GiftCard';
import { giftCardsSignal } from '@signals/giftcards.signal';
import SearchModal from '@/components/search/SearchModal';
import { useEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import SearchButton from '@/components/search/SearchButton';
import SearchInput from '@/components/search/SearchInput';

const GiftCards = () => {
  const navigation = useNavigation();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleSearch();
  }, [])

  const handleSearch = () => {
    setIsLoading(true);
    setShowSearchModal(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white pt-10'>
      <View className='pl-6 pr-4 py-4'>
        <SearchInput />
      </View>
      {isLoading && 
        <View className='flex flex-1 justify-center items-center h-full'>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
      }
      {!isLoading && 
        <FlatList 
          className='px-6 pt-4'
          data={giftCardsSignal.value}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => (
            <GiftCard giftCard={item} className="mb-5" />
          )}
          keyboardDismissMode='on-drag'
        />
      }
    </SafeAreaView>
  );
}

export default GiftCards;
