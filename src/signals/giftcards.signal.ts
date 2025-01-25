import { signal, effect, computed } from "@preact/signals-react";
import giftCards from "@assets/data/giftcards";
import { GiftCardType } from "@/types";

const giftCardsSignal = signal<GiftCardType[]>(giftCards);
const trendingGiftcardsSignal = signal<GiftCardType[]>(giftCards);

const giftCardSignal = signal<GiftCardType>({});

const setGiftCard = (giftCard: GiftCardType) => {
  giftCardSignal.value = giftCard
}

const resetGiftCard = () => {

}

export {
  giftCardsSignal,
  trendingGiftcardsSignal,
  giftCardSignal,
  setGiftCard,
  resetGiftCard
} 
  