import ListItem from '@/components/common/ListItem';
import { Href, Link, RelativePathString, router, usePathname } from 'expo-router';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { categorySignal } from "@signals/search.signal";
import { SafeAreaView } from 'react-native-safe-area-context';
import giftCards from '@assets/data/giftcards';
import GiftCard from '@/components/GiftCard';
import CardsScreenHeader from '@/components/cards/CardsScreenHeader';

const Profile = () => {
  const allCards = giftCards;

  const getCards = () => {

  }

  return (
    <SafeAreaView className='h-full bg-white'>
      <FlatList 
        className='px-5'
        data={allCards}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <GiftCard giftCard={item} className="mb-5" />
        )}
        ListHeaderComponent={() => (
          <View className='py-3 px-5 bg-white -mx-5 mb-3'
          style={styles.shadow}
          >
            <CardsScreenHeader />
          </View>
        )}
        keyboardDismissMode='on-drag'
        stickyHeaderIndices={[0]}
      />
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
  }
});

export default Profile;
