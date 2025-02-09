import { CartItemType, GiftCardType } from "@/types";
import { signal } from "@preact/signals-react";

const cartSignal = signal<CartItemType[]>([]);

const addItemToCart = (quantity: number, amount: string, giftCard: GiftCardType, email: string, phone: string) => {
  const newCartItem: CartItemType = {quantity: quantity, amount: amount, giftCard: giftCard, email, phone}
  cartSignal.value = [...cartSignal.value, newCartItem]
}

export {
  cartSignal,
  addItemToCart
}