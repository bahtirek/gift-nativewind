import { View, TextInput, StyleSheet, Platform } from 'react-native'
import React, { useState } from 'react'
import { maskPhone, maskCurrency } from '../../utils/masks'

const CustomInput = ( { onInput, keyboardType, mask, ...rest }: any) => {
  const [value, setValue] = useState('');

  const onChange = (text: string) => {
    let newValue = '';
    if(mask) {
      if(mask && mask == "numeric") {
        newValue = text.replace(/[^0-9]/g, '');
      } else if (mask == "phone") {
        newValue = maskPhone(text)
      } else if(mask == "currency") {
        newValue = maskCurrency(text)
      }
    }
    setValue(newValue);
    onInput(value)
  }

  return (
    <View className="flex flex-row items-center w-full relative bg-white rounded-2xl" style={styles.shadow}>
      <TextInput
        className="text-base mt-0.5 text-gray flex-1 font-pregular bg-white h-14 pl-4 pr-12 rounded-2xl focus:border-primary"
        value={value}
        placeholderTextColor="#FFA07A"
        onChangeText={(text) => onChange(text)}
        keyboardType={keyboardType || 'default'}
        {...rest}
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