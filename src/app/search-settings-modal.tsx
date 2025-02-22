import { View, Text, StyleSheet,  Platform, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryFilterList from '../components/search/CategoryFilterList';
import LocationDropdown from '../components/search/LocationDropdown';
import { Stack } from 'expo-router';

const SearchModal = () => {
  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white flex-1'>
      <Stack.Screen options={{title: `Search settings`, headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View className='flex w-full h-full bg-white' style={styles.container}>
        <View className="flex bg-white px-8 pt-4 flex-1">
          <Text className='text-primary mt-5 mb-2'>Category</Text>
            <CategoryFilterList />
          <Text className='text-primary mt-7'>Location</Text>
          <View style={styles.dropdown}>
            <LocationDropdown />
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
})

export default SearchModal;