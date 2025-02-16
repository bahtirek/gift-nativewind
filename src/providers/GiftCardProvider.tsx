import { GiftCardType } from "@/types";
import giftcards from "@assets/data/giftcards";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type GiftCardProviderType = {
  giftCards: GiftCardType[];
}

export const GiftCardContext = createContext<GiftCardProviderType>({
  giftCards: [],
});


const GiftCardProvider = ({children}: PropsWithChildren) => {
  const [giftCards, setGiftCards] = useState([]);

  useEffect(() => {
    setGiftCards(giftCards)
  }, [])

  return(
    <GiftCardContext.Provider value={{giftCards}}>
      {children}
    </GiftCardContext.Provider>
  )
}

export default GiftCardProvider;

export const useGiftCard = () => useContext(GiftCardContext)