import { View } from 'react-native';
import CardListItem from '@/components/CardListItem';
import CategoryList from '@/components/CategoryList/CategoryList';

export default function TabOneScreen() {
  return (
    <View>
      <CategoryList />
      {/* list loop will iterate the cardlistitem component */}
      <CardListItem />
    </View>
  );
}
