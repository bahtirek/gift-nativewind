import { View, TextInput, TouchableOpacity, Image, Alert, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import icons from '@constants/icons';

const CustomInput = ( { onInput, initialValue, placeholder }: any) => {
  useEffect(() => {
    if(initialValue) setValue(initialValue)
  }, [initialValue])

  const [value, setValue] = useState('');

  const onChange = (e: string) => {
    console.log(e);
    
  }

  return (
    <View className="flex flex-row items-center w-full relative bg-white rounded-2xl" style={styles.shadow}>
      <TextInput
        className="text-base mt-0.5 text-gray flex-1 font-pregular bg-white h-14 pl-4 pr-12 rounded-2xl focus:border-primary"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#FFA07A"
        onChangeText={(e) => onChange(e)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "rgba(152, 152, 152, 0.5)",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
});

export default CustomInput