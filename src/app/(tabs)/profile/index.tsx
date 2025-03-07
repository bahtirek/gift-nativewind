import ListItem from '@/components/common/ListItem';
import { Href, Link, RelativePathString, router, usePathname } from 'expo-router';
import { FlatList, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  const profileMenuItems = [
    {id: 1, label: "Account", path: 'account'},
    {id: 2, label: "Orders", path: 'orders'},
    /* {id: 3, label: "Favorites", path: 'favorites'}, */
  ]
  const pathname = usePathname();

  const goToScreen = (path: RelativePathString) => {
    router.push(`${pathname}/${path}` as RelativePathString)
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      {
        profileMenuItems.map((item) => {
          return <ListItem label={item.label} key={item.id} handlePress={() => {goToScreen(item.path as RelativePathString)}}/>
        })
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  link: {
    
  },
});

export default Profile;
