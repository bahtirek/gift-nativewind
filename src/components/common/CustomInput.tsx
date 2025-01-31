import { View, TextInput, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'

const CustomInput = ( { onInput, placeholder, keyboardType }: any) => {
  const [value, setValue] = useState('');

  const onChange = (text: string) => {
    if(keyboardType && keyboardType == "numeric") {
      text = text.replace(/[^0-9]/g, '');
    }
    setValue(text);
    onInput(value)
  }

  return (
    <View className="flex flex-row items-center w-full relative bg-white rounded-2xl" style={styles.shadow}>
      <TextInput
        className="text-base mt-0.5 text-gray flex-1 font-pregular bg-white h-14 pl-4 pr-12 rounded-2xl focus:border-primary"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#FFA07A"
        onChangeText={(text) => onChange(text)}
        keyboardType={keyboardType || 'default'}
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