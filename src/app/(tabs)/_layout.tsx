import React from 'react';
import { Tabs } from 'expo-router';
import { Image, View, ColorValue, Platform } from 'react-native';
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
    </View>
  )
}
export default function TabLayout() {
  let tabHeight = 70;
  if (Platform.OS === 'android') {
    tabHeight = 40;
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
      />
      <Tabs.Screen
        name="allcards"
        options={{
          title: 'Gift Cards',
          headerTintColor: '#FF4416',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.allcards}
              color={color}
              name='Gift Cards'
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
          headerTintColor: '#FF4416',
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
