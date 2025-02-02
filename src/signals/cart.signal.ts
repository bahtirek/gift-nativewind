import { CartItemType, GiftCardType } from "@/types";
import { signal } from "@preact/signals-react";

const cartSignal = signal<CartItemType[]>([]);

const addItemToCart = (quantity: number, amount: string, giftCard: GiftCardType) => {
  const newCartItem: CartItemType = {quantity: quantity, amount: amount, giftCard: giftCard}
  cartSignal.value = [...cartSignal.value, newCartItem]
}

export {
  cartSignal,
  addItemToCart
}