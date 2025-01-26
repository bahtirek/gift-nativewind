import { FlatList, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GiftCard from '@/components/GiftCard';
/* import CardsScreenHeader from '@/components/cards/CardsScreenHeader'; */
import { giftCardsSignal } from '@signals/giftcards.signal';
import SearchModal from '@/components/search/SearchModal';
import { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import SearchButton from '@/components/search/SearchButton';

const GiftCards = () => {
  const navigation = useNavigation();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal); 
  }

  useEffect(() => {
    navigation.setOptions({ headerRight: () => (
      <SearchButton handlePress={toggleSearchModal}/>
    ),});
  }, [navigation]);

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList 
        className='px-5'
        data={giftCardsSignal.value}
        keyExtractor={(item) => item.id!}
        renderItem={({item}) => (
          <GiftCard giftCard={item} className="mb-5" />
        )}
        keyboardDismissMode='on-drag'
      />

      <SearchModal showSearchModal={showSearchModal} toggleSearchModal={() => {toggleSearchModal()}}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgLightOrange: {
    backgroundColor: '#f9660014'
  },
  shadow: {
    shadowColor: "#FF4416",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 50
      }
    })
  },
  dropdown: {
    ...Platform.select({
      android: {
        marginLeft: -15
      }
    })
  }
});

export default GiftCards;
