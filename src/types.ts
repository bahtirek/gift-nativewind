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

export type CategoryItemType = {
  label?: string,
  icon: string,
  id: string,
};

export type GiftCardType = {
  id?: string,
  label?: string,
  thumbnail?: string,
  description?: string,
  address?: string,
  phone?: string,
  website?: string,
  instagram?: string,
  telegram?: string,
  priceSet: PriceType[] 
};

export type CreatorType = {
  username: string,
  avatar: string
}

export type Location = {
  id?: string,
  name?: string
}

export type PriceType = {
  id: string,
  amount: string
}

export type CartItemType = {
  quantity?: number,
  amount?: string,
  email?: string,
  phone?: string,
  giftCard?: GiftCardType
}