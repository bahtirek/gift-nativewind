import { View, TextInput, StyleSheet, Platform, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { maskPhone, maskCurrency, maskVisaCard, maskExpDate, maskName } from '../../utils/masks'

type validationProp = {
  isValid: boolean,
  error: string
}

const CustomInput = ( { onInput, mask, presetValue, className, reset, rules, prefix, ...rest }: any) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState<validationProp>({isValid: true, error: ''})

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
    const validationResult: validationProp = validateRules(value);
    setValidation(validationResult);
    onInput({value: value, isValid: validationResult.isValid});
  }

  const validateRules = (value: string):validationProp => {
    let validationResult = { isValid: true, error: '' }
    if(!rules) return validationResult;

    rules.find((rule: Function) => {
      const result = rule(value);
      if(result !== true) {
        validationResult = {
          isValid: false,
          error: result
        }
      }
    });
    return validationResult
  }

  const onBlur = () => {
    setTouched(true);
  }

  return (
    <View className='w-full'>
      <View className='flex flex-row items-center w-full relative bg-white rounded-2xl' style={styles.shadow}>
        <TextInput
          className={`text-base mt-0.5 text-gray flex-1 font-pregular bg-white h-16 px-4 rounded-2xl focus:border-primary ${!validation.isValid && touched ? 'border-red-600' : ''} ${className}`}
          value={value}
          placeholderTextColor="#FFA07A"
          onChangeText={onChange}
          onBlur={onBlur}
          {...rest}
        />
        <View className='absolute left-0 h-full justify-center pl-4'>
          <Text className='text-[16px] text-gray-700 mt-0.5'>{prefix}</Text>
        </View>
      </View>
      {
        (!validation.isValid && touched) && <Text className='text-red-500 mt-1 ml-4'>{validation.error}</Text>
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
  },
});

export default CustomInput