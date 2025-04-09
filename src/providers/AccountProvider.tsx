import { AccountType } from "@/types";
import { randomUUID } from "expo-crypto";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AccountProviderType = {
  account: AccountType;
  saveAccount: (phone: string, name: string) => void;
  saveTempAccount: () => void;
  setTempAccount: (phone: string, name: string) => void;
}
export const AccountContext = createContext<AccountProviderType>({
  account: {},
  saveAccount: () => {},
  saveTempAccount: () => {},
  setTempAccount: () => {},
});


const AccountProvider = ({children}: PropsWithChildren) => {
  const [account, setAccount] = useState<AccountType>({});
  let tempAccount = {};

  useEffect(() => {
    getAccountFromStorage()
  }, [])

  const saveAccount = (phone?: string, name?: string) => {
    if(phone && name) {
      saveAccountToStorage({phone, name})
    } else {
      saveAccountToStorage(tempAccount)
    }
  }
  const saveTempAccount = () => {
    saveAccountToStorage(tempAccount)
  }

  const setTempAccount = (phone: string, name: string) => {
    tempAccount = {phone, name}
  }

  const saveAccountToStorage = async (account: AccountType) => {
    try {
      const jsonValue = JSON.stringify(account);
      await AsyncStorage.setItem('account', jsonValue);
      setAccount(account);
    } catch (e) {
      console.log(e);
    }
  }

  const getAccountFromStorage = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem('account');
      if(jsonValue != null) {
        setAccount(JSON.parse(jsonValue)) 
      }
    } catch (e) {
      console.log(e);
    }
  }


  return(
    <AccountContext.Provider value={{account, saveAccount, setTempAccount, saveTempAccount}}>
      {children}
    </AccountContext.Provider>
  )
}

export default AccountProvider;

export const useAccount = () => useContext(AccountContext)