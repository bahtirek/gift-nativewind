import React from 'react';
import { FlatList } from 'react-native';
import { categorySignal, setCategory } from "@signals/category.signal";
import CategoryCheckbox from './CategoryCheckBox';

const CategoryFilter = () => {
  const handelCheckBoxSelect = (id: string, value: boolean) => {
    setCategory(id, value)
  }

  return (
    <FlatList
      scrollEnabled={false}
      className='w-full flex-grow-0'
      data={categorySignal.value}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <CategoryCheckbox item={item} handelCheckBoxSelect={(value: boolean) => {handelCheckBoxSelect(item.id, value)}}/>
      )}
    />
  )
}

export default CategoryFilter;