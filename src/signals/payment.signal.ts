import { signal, effect, computed } from "@preact/signals-react";
import giftCards from "@assets/data/giftcards";
import { GiftCardType, PaymentType } from "@/types";


const paymentSignal = signal<PaymentType>({});

const setPaymentSignal = (payment: PaymentType) => {
  paymentSignal.value = payment
}

const resetPaymentSignal = () => {
  paymentSignal.value = {}
}

export {
  paymentSignal,
  setPaymentSignal,
  resetPaymentSignal
} 
  