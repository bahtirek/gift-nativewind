import { View, Alert } from 'react-native'
import { router, usePathname } from 'expo-router';
import { useSearchSettings } from '@/providers/SearchSettingsProvider';
import React, {  useEffect, useState } from 'react'
import icons from '@constants/icons';
import CustomInput from '../common/CustomInput';
import IconButton from '../common/IconButton';
import { setSearchQuerySignal } from '@/signals/search.signal';

const SearchInput = () => {
  const { updateSearchQuery } = useSearchSettings();
  const pathname = usePathname();
  let searchQuery = ''
  
  const handleSearchInput = (value: string) => {
    searchQuery = value 
  }  
  
  const handleSearchQuery = () => {
    if(!searchQuery) {
      Alert.alert('Missing data', "Please input search query")
    } else {
      updateSearchQuery(searchQuery);
      
      if(pathname.includes('/gift-cards')) {
        console.log(searchQuery);

      } else {
        router.navigate('/gift-cards');
      }
    }
  }

  const openSettings = () => {
    router.navigate('/search-settings-modal')
  }

  return (
    <View className="flex flex-row w-full items-center">
      <View className="flex flex-row items-center relative flex-1 pr-1">
        <CustomInput 
          onInput={(value: string) => {handleSearchInput(value)}} 
          placeholder='Search for perfect gift'
          reset={true}
        />

        <View className='absolute right-4'>
          <IconButton icon={icons.search_orange} handlePress={handleSearchQuery} />
        </View>
      </View>

      <View>
        <IconButton icon={icons.controls} handlePress={openSettings} />
      </View>
    </View>
  )
}

export default SearchInput