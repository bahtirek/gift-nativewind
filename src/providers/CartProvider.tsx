import { CartItemType, GiftCardType } from "@/types";
import { randomUUID } from "expo-crypto";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type CartType = {
  items: CartItemType[];
  totalItemsInCart: number
  cartItemToEdit: CartItemType
  addItem: (quantity: number, amount: string, giftCard: GiftCardType, email: string, phone: string, note: string, otherAmount: string, id: string) => void;
  addItemToEdit: (item: CartItemType) => void,
}
export const CartContext = createContext<CartType>({
  items: [],
  totalItemsInCart: 0,
  cartItemToEdit: {},
  addItem: () => {},
  addItemToEdit: () => {},
});


const CartProvider = ({children}: PropsWithChildren) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [totalItemsInCart, setTotalItems] = useState(0);
  const [cartItemToEdit, setCartItemToEdit] = useState({});

  useEffect(() => {
    setTotalItems(items.length)
  }, [items])

  const addItem = (quantity: number, amount: string, giftCard: GiftCardType, email: string, phone: string, note: string, otherAmount: string, id: string) => {
    if(id) {
      setItems( items.map((item) => item.id !== id ? item : {
        id,
        quantity, 
        amount, 
        giftCard, 
        email, 
        phone, 
        note,
        otherAmount
      }))
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
      setItems([...items, newCartItem]);   
    }
    setTotalItems(items.length)
  }

  const addItemToEdit = (item: CartItemType) => {
    setCartItemToEdit(item)
  }
  return(
    <CartContext.Provider value={{items, addItem, totalItemsInCart, addItemToEdit, cartItemToEdit}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext)