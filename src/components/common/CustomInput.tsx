import { View, TextInput, StyleSheet, Platform, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { maskPhone, maskCurrency, maskVisaCard, maskExpDate, maskName } from '../../utils/masks'
import { useFocusEffect } from 'expo-router';

const CustomInput = ( { onInput, mask, error, presetValue, className, reset, ...rest }: any) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    onChange(value)
  }, [value])

  useEffect(() => {
    if(presetValue) {
      onChange(presetValue)
    }
  }, [presetValue])

  useEffect(() => {
    if(reset) {
      setValue('')
    }
  }, [reset])

  const onChange = (text: string) => {
    let newValue = text;
    
    if(mask) {
      if(mask && mask == "numeric") {
        newValue = text.replace(/[^0-9]/g, '');
      } else if (mask == "phone") {
        newValue = maskPhone(text)
      } else if(mask == "currency") {
        newValue = maskCurrency(text)
      } else if(mask == "maskVisaCard") {
        newValue = maskVisaCard(text)
      } else if(mask == "maskExpDate") {
        newValue = maskExpDate(text)
      } else if(mask == "maskName") {
        newValue = maskName(text)
      }
    }
    setValue(newValue);
    onInput(value);    
  }

  return (
    <View className='w-full'>
      <View className='flex flex-row items-center w-full relative bg-white rounded-2xl' style={styles.shadow}>
        <TextInput
          className={`text-base mt-0.5 text-gray flex-1 font-pregular bg-white h-16 px-4 rounded-2xl focus:border-primary ${error ? 'border-red-600' : ''} ${className}`}
          value={value}
          placeholderTextColor="#FFA07A"
          onChangeText={onChange}
          {...rest}
        />
      </View>
      {
        (!!error) && <Text className='text-red-500 mt-1 ml-4'>{error}</Text>
      }
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