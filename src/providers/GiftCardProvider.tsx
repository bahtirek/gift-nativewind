import { GiftCardType } from "@/types";
import allGiftCards from "@assets/data/allcards";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type GiftCardProviderType = {
  giftCards: GiftCardType[];
}

export const GiftCardContext = createContext<GiftCardProviderType>({
  giftCards: [],
});


const GiftCardProvider = ({children}: PropsWithChildren) => {
  const [giftCards, setGiftCards] = useState<GiftCardType[]>([]);

  useEffect(() => {
    setGiftCards(allGiftCards)
  }, [])

  return(
    <GiftCardContext.Provider value={{giftCards}}>
      {children}
    </GiftCardContext.Provider>
  )
}

export default GiftCardProvider;

export const useGiftCard = () => useContext(GiftCardContext)