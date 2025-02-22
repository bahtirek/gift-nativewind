import { View, Alert } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import CustomInput from '../common/CustomInput';
import { router } from 'expo-router';
import IconButton from '../common/IconButton';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInput = (value: string) => {
    setSearchQuery(value)
  }

  const handleSearchQuery = () => {
    if(!searchQuery) {
      Alert.alert('Missing data', "Please input search query")
    } else {
      console.log(searchQuery);
      
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