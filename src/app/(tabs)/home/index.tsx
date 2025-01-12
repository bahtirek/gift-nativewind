import { View } from 'react-native';
import CardListItem from '@/components/CardListItem';

export default function TabOneScreen() {
  return (
    <View>
      {/* list loop will iterate the cardlistitem component */}
      <CardListItem />
    </View>
  );
}
