import { TextInput, TextInputProps } from "react-native"

export type CustomButtonType = {
  label: string, 
  containerStyles?: string,
  handlePress?: any,
  textStyles?: string, 
  isLoading?: boolean 
}

export type ListItemType = {
  label: string, 
  containerStyles?: string,
  handlePress?: any
}

export type FormFieldType = {
  title?: string, 
  value?: string, 
  placeholder?: string, 
  handleChangeText?: any, 
  otherStyles?: string,
} & React.ComponentPropsWithoutRef<typeof TextInput>;

export type VideoCardType = {
  label?: string,
  thumbnail?: string,
  promt?: string,
  icon: string,
  $id: string,
  creator: CreatorType
};

export type GiftCardType = {
  label?: string,
  thumbnail?: string,
  description?: string,
  $id: string,
};

export type CreatorType = {
  username: string,
  avatar: string
}