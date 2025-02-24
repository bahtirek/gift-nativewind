import { FlatList, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { giftCardsSignal } from '@signals/giftcards.signal';
import { useCallback, useEffect, useState } from 'react';
import { useSearchSettings } from '@/providers/SearchSettingsProvider';
import { useGiftCard } from '@/providers/GiftCardProvider';
import SearchInput from '@/components/search/SearchInput';
import GiftCard from '@/components/GiftCard';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import icons from '@/constants/icons';
import { GiftCardType } from '@/types';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';

const GiftCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [giftCards, setGiftCards] = useState<GiftCardType[]>([])
  const { location, categories } = useSearchSettings();
  let { search } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      handleSearch()
      return () => {
        router.setParams({});
        search = ''
      };
    }, [search])
  );

  
  const handleSearch = () => {
    setIsLoading(true);
    if(search) {
      setGiftCards([]);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setGiftCards(giftCardsSignal.value)
      setIsLoading(false);
    }
  }

  const handleSearchFromInput = (searchQuery: string) => {
    search = searchQuery;
    router.setParams({search: searchQuery});
    handleSearch();
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white pt-10'>
      <View className='pl-6 pr-4 py-4'>
        <SearchInput handleSearch={handleSearchFromInput} />
      </View>
      {isLoading && 
        <View className='flex flex-1 justify-center items-center h-full'>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
      }
      {!isLoading && 
        <FlatList 
          className='px-6 pt-4'
          data={giftCards}
          keyExtractor={(item) => item.id!}
          renderItem={({item}) => (
            <GiftCard giftCard={item} className="mb-5" />
          )}
          keyboardDismissMode='on-drag'
          ListEmptyComponent={() => (
            <ListEmptyComponent
              icon={icons.zoom_out_d4d4d4}
              title='No Gift cards Found'
              subtitle='Get best Gift for your friends, co-worker or loved ones'
            />
          )}
        />
      }
    </SafeAreaView>
  );
}

export default GiftCards;
