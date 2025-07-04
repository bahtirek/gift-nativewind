import React, { useEffect, useState } from 'react';
import { Tabs, router } from 'expo-router';
import { Image, View, ColorValue, Platform, Text, StyleSheet } from 'react-native';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import icons from '@/constants/icons';
import { useCart } from '@/providers/CartProvider';

const TabIcon = ({icon, color,  name, focused}: {icon: object, color: ColorValue, name: string, focused: boolean}) => {
  const [totalInCart, setTotalInCart] = useState(0);

  return (
    <View className='items-center justify-center gap-2'>
      <Image 
      source={icon} 
      resizeMode='contain' 
      tintColor={color}
      className='"!w-6 !h-6'
    />
    </View>
  )
}
const CartIcon = ({icon, color,  name, focused}: {icon: object, color: ColorValue, name: string, focused: boolean}) => {
  const { totalItemsInCart } = useCart();
  
  return (
    <View className='items-center justify-center gap-2'>
      <Image 
      source={icon} 
      resizeMode='contain' 
      tintColor={color}
      className='"!w-6 !h-6'
    />
    {
      totalItemsInCart > 0 &&
      <View className='flex justify-center items-center absolute' style={styles.cartTotal}>
        <Text className=' text-primary rounded-sm text-xs'>{totalItemsInCart}</Text>
      </View>
    }
    </View>
  )
}

export default function TabLayout() {
  let tabHeight = 70;
  if (Platform.OS === 'android') {
    tabHeight = 70;
    // Code specific to Android
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FF4416',
        tabBarInactiveTintColor: '#b8b8b8',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: tabHeight,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#FF8162'
        }
      }}>
      <Tabs.Screen name="index" options={{href: null}}/>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerTintColor: '#FF4416',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.home}
              color={color}
              name='Home'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gift-cards"
        options={{
          lazy: false,
          title: 'All cards',
          headerTintColor: '#FF4416',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.allcards}
              color={color}
              name='All cards'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: 'Basket',
          headerTintColor: '#FF4416',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <CartIcon 
              icon={icons.basket}
              color={color}
              name='Basket'
              focused={focused}
            />
          )
        }}
      />
{/*       <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          headerTintColor: '#FF4416',
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.bookmark}
              color={color}
              name='Bookmark'
              focused={focused}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTintColor: '#FF4416',
          headerShown: false,
          headerTitleStyle: { color: '#FF4416' },
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.profile}
              color={color}
              name='Profile'
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cartTotal: {
    backgroundColor: '#fff',
    top: -5,
    left: 45,
    zIndex: 1,
    borderRadius: 10
  },
});
