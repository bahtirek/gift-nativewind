import React from 'react';
import { Tabs } from 'expo-router';
import { Image, View, ColorValue } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import icons from '@/constants/icons';

const TabIcon = ({icon, color, name, focused}: {icon: object, color: ColorValue, name: string, focused: boolean}) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image 
      source={icon} 
      resizeMode='contain' 
      tintColor={color}
      className='"!w-6 !h-6'
    />
    {/* <Text 
      className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      style={{color: color}}
    >
      {name}
    </Text> */}
    </View>
  )
}
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FF692E',
        tabBarInactiveTintColor: '#b8b8b8',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: 40,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#FF692E'
        }
      }}>
      <Tabs.Screen name="index" options={{href: null}}/>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
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
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.bookmark}
              color={color}
              name='Bookmark'
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: 'Basket',
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.basket}
              color={color}
              name='Basket'
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
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
