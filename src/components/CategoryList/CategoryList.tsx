import { FlatList } from 'react-native'
import React, { useState } from 'react'
import { CategoryItemType } from 'src/types'
import CategoryItem from './CategoryItem'

type VideoCardPropType = {
  categories: CategoryItemType[]
}

const CategoryList = ({categories}: VideoCardPropType) => {
  const [activeItem, setActiveItem] = useState<string>(categories[0]?.$id);

  return (
    <FlatList 
      data={categories}
      keyExtractor={(item) => item.$id}
      renderItem={({item}) => (
        <CategoryItem activeItem={activeItem} item={item} />
      )}
      horizontal
      className='pb-2'
    />
  )
}

export default CategoryList