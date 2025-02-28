import { CartItemType, GiftCardType } from "@/types";
import { randomUUID } from "expo-crypto";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type CartType = {
  items: CartItemType[];
  totalItemsInCart: number
  cartItemToEdit: CartItemType
  addItem: (quantity: number, amount: string, giftCard: GiftCardType, email: string, phone: string, note: string, otherAmount: string, id: string) => void;
  addItemToEdit: (item: CartItemType) => void,
  deleteItemFromCart: (id: string) => void,
}
export const CartContext = createContext<CartType>({
  items: [],
  totalItemsInCart: 0,
  cartItemToEdit: {},
  addItem: () => {},
  addItemToEdit: () => {},
  deleteItemFromCart: () => {},
});


const CartProvider = ({children}: PropsWithChildren) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [totalItemsInCart, setTotalItems] = useState(0);
  const [cartItemToEdit, setCartItemToEdit] = useState({});

  useEffect(() => {
    setTotalItems(items.length)
  }, [items])

  useEffect(() => {
    getCartItemsFromStorage()
  }, [])

  const addItem = (quantity: number, amount: string, giftCard: GiftCardType, email: string, phone: string, note: string, otherAmount: string, id: string) => {
    if(id) {
      const updatedItems = items.map((item) => item.id !== id ? item : {
        id,
        quantity, 
        amount, 
        giftCard, 
        email, 
        phone, 
        note,
        otherAmount
      })
      saveItems(updatedItems)
    } else {
      const newCartItem = {
        id: randomUUID(),
        quantity, 
        amount, 
        giftCard, 
        email, 
        phone, 
        note,
        otherAmount
      }
      saveItems([...items, newCartItem]);   
    }
  }

  const addItemToEdit = (item: CartItemType) => {
    setCartItemToEdit(item)
  }

  const deleteItemFromCart = (id: string) => {
    const updatedItems = items.map((item) =>
      item.id !== id ? item : {}
    ).filter((item) => item.id);

    setItems(updatedItems);
  }

  const saveItems = (items: CartItemType[]) => {
    setItems(items);
    saveItemsToStorage(items);
  }

  const saveItemsToStorage = async (items: CartItemType[]) => {
    try {
      const jsonValue = JSON.stringify(items);
      await AsyncStorage.setItem('cartItems', jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  const getCartItemsFromStorage = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('cartItems');
      if(jsonValue != null && JSON.parse(jsonValue).length > 0) {
        setItems(JSON.parse(jsonValue)) 
      }
    } catch (e) {
      console.log(e);
    }
  }

  return(
    <CartContext.Provider value={{items, addItem, totalItemsInCart, addItemToEdit, cartItemToEdit, deleteItemFromCart}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext)