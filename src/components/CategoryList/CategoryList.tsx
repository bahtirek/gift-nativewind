import { FlatList } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'
import { categorySignal, setCategory } from '@signals/category.signal';

const CategoryList = () => {
  return (
    <FlatList 
      data={categorySignal.value}
      keyExtractor={(item) => item.label}
      renderItem={({item}) => (
        <CategoryItem item={item} />
      )}
      horizontal
      className='pb-2'
    />
  )
}

export default CategoryList