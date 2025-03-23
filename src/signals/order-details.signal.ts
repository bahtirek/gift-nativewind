import { CartItemType } from "@/types";
import { signal } from "@preact/signals-react";

const orderDetails = signal<CartItemType>({});

const setOrderDetails = (order: CartItemType) => {
  orderDetails.value = order
}

export {
  orderDetails,
  setOrderDetails
}