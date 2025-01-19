import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps, Alert } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import { Href, router, usePathname } from 'expo-router';

const SearchInput = () => {
  const [query, setQuery] = useState('')
  const pathname = usePathname();
  
  return (
    <View className="flex flex-row items-center space-x-4 mb-6 w-full relative">
      <TextInput
        className="text-base mt-0.5 text-gray flex-1 font-pregular h-14 pl-4 pr-12 rounded-2xl border border-secondary-200 focus:border-primary"
        value={query}
        placeholder={'Search for perfect gift place'}
        placeholderTextColor="#FFA07A"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if(!query) {
            return Alert.alert('Missing query', "Please input something to search results across database")
          }
          if(pathname.startsWith('/search')) router.setParams({query})
            else router.push(`/search/${query}` as Href)
        }}
        className='absolute right-4'
      >
        <Image 
          source={icons.search}
          className='!w-5 !h-5'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput