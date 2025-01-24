import { signal, effect, computed } from "@preact/signals-react";
import giftCards from "@assets/data/giftcards";

const giftcardsSignal = signal(giftCards);
const trendingGiftcardsSignal = signal(giftCards);

export {
  giftcardsSignal,
  trendingGiftcardsSignal,
} 
  