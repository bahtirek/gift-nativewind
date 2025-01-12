import ListItem from '@/components/common/ListItem';
import { Href, Link, RelativePathString, router, usePathname } from 'expo-router';
import { FlatList, View, StyleSheet } from 'react-native';

const Profile = () => {
  const profileMenuItems = [
    {id: 1, label: "Account", path: 'account'},
    {id: 2, label: "Orders", path: 'orders'},
  ]
  const pathname = usePathname();

  return (
    <View className=''>
      {/* list loop will iterate the cardlistitem component */}
      <FlatList 
        data={profileMenuItems}
        keyExtractor={(item) => item.label}
        renderItem={({item}) => (
          <ListItem label={item.label} handlePress={() => {router.push(`${pathname}/${item.path}` as RelativePathString)}}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    
  },
});

export default Profile;
