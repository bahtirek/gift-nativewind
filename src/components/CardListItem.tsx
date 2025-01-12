import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { Href, Link } from 'expo-router'

const CardListItem = () => {
  return (
    <Link href={'/home/1' as Href} asChild>
      {/* <Link href={`${card.id}`} asChild> */}
      <Pressable>
        <Text className='text-primary text-3xl'>CardListItem</Text>
      </Pressable>
    </Link>
  )
}

export default CardListItem
