import { Text, View } from '@/components/Themed';
import { Stack } from 'expo-router';
import CardListItem from '@/components/CardListItem';

export default function TabOneScreen() {
  return (
    <View>
      {/* list loop will iterate the cardlistitem component */}
      <CardListItem />
    </View>
  );
}
