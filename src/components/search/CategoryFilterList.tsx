import React from 'react';
import { FlatList } from 'react-native';
import CategoryCheckbox from '../category/CategoryCheckBox';
import { useSearchSettings } from '@/providers/SearchSettingsProvider';

const CategoryFilter = () => {
  const { categories, updateCategories } = useSearchSettings();
  
  const handelCheckBoxSelect = (id: string, value: boolean) => {
    updateCategories(id, value)
  }

  return (
    <FlatList
      scrollEnabled={false}
      className='w-full flex-grow-0'
      data={categories}
      keyExtractor={(item) => item.id!}
      renderItem={({item}) => (
        <CategoryCheckbox item={item} handelCheckBoxSelect={(value: boolean) => {handelCheckBoxSelect(item.id!, value)}}/>
      )}
    />
  )
}

export default CategoryFilter;