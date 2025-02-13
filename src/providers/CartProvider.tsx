import { CartItemType, GiftCardType } from "@/types";
import { randomUUID } from "expo-crypto";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type CartType = {
  items: CartItemType[];
  addItem: (quantity: number, amount: string, giftCard: GiftCardType, email: string, phone: string) => void;
  totalItemsInCart: number
}
export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  totalItemsInCart: 0
});


const CartProvider = ({children}: PropsWithChildren) => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [totalItemsInCart, setTotalItems] = useState(0)
  useEffect(() => {
    setTotalItems(items.length)
  }, [items])

  const addItem = (quantity: number, amount: string, giftCard: GiftCardType, email: string, phone: string) => {
    const newCartItem = {
      id: randomUUID(),
      quantity, 
      amount, 
      giftCard, 
      email, 
      phone
    }
    setItems([...items, newCartItem]);
    console.log("items",items);
    
    setTotalItems(items.length)
  }
  return(
    <CartContext.Provider value={{items, addItem, totalItemsInCart}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const useCart = () => useContext(CartContext)