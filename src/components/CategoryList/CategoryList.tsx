import { FlatList } from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'
import categories from '@assets/data/categories';

const CategoryList = () => {
  return (
    <FlatList 
      data={categories}
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