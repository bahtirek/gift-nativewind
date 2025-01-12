import { Href, Link, usePathname } from 'expo-router';
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
          <Link href={`${pathname}/${item.path}` as Href} style={styles.item}>{item.label}</Link>
        )}
        className='p-2'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default Profile;
