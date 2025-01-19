import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, FlatList } from 'react-native'
import React, { useState } from 'react'
import icons from '@constants/icons';
import searchQuerySignal from "@signals/search.signal";
import categories from '@assets/data/categories';
import Checkbox from 'expo-checkbox';
import CategoryCheckbox from '../CategoryList/CategoryCheckBox';

const SearchInput = ( { handleSearchQuery }: any) => {
  const [query, setQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const handelCheckBoxSelect = () => {
    console.log("checked");
    
  }
  
  return (
    <View className="flex flex-row items-center w-full relative">
      <View className="flex flex-row items-center flex-1 relative">
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
            searchQuerySignal.value = query;
            handleSearchQuery()
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
      <View className='pl-4'>
        <TouchableOpacity
          onPress={toggleSettings}
          className=''
        >
          <Image 
            source={icons.controls}
            className='!w-6 !h-6'
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
      {showSettings && 
        <View className='overflow-hidden w-[calc(100%+2.5rem)] absolute top-[70px] -mx-5 pb-4'>
          <View 
            className="flex flex-row items-center bg-white"
            style={styles.shadow}
            >
            <FlatList
              className='px-8 py-5 w-full'
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <CategoryCheckbox item={item} handelCheckBoxSelect={handelCheckBoxSelect}/>
              )}
            />
          </View>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#FF4416",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  }
});
export default SearchInput