import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import {setSearchQuery } from "@signals/search.signal";

const SearchInput = ( { handleSearchQuery }: any) => {
  const [query, setQuery] = useState('');

  return (
    <View className="flex flex-row items-center w-full relative">
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
          setSearchQuery(query);
          handleSearchQuery();
        }}
        className='absolute right-4'
      >
        <Image 
          source={icons.search_orange}
          className='!w-6 !h-6'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput