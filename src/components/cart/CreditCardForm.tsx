import { View, Alert, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { isEmpty, validateCreditCard, validateLength, validateExpDate } from '../../utils/input-validation';
import CustomInput from '../common/CustomInput';
import { PaymentType } from '@/types';
import { setPaymentSignal } from '@/signals/payment.signal';

const CreditCardForm = ({validate, paymanetUpdated}: any) => {
  const [cardholderName, setCardholderName] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [expDate, setExpDate] = useState('');
  const [creditCardError, setCreditCardError] = useState<null | string>(null);
  const [expDateError, setExpDateError] = useState('');
  const [cardholderNameError, setCardholderNameError] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState('')
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    if(!isValidated) setIsValidated(validate);
    isFormCompleted();
  }, [validate])
  
  const isFormCompleted = () => {
    if (!cardholderName || !creditCard || !expDate || !cvv ) {
      console.log('Missing data', "Please provide payment details");
      
      return Alert.alert('Missing data', "Please provide payment details")
    } else if (
      !isEmpty(cardholderName) && 
      !validateCreditCard(creditCard) && 
      !validateExpDate(expDate) && 
      !validateLength(cvv, 3, 'Wrong cvv')
    ) {
      const payment: PaymentType = {
        cardholderName: cardholderName,
        creditCard: creditCard,
        expDate: expDate,
        cvv: cvv
      };
      setPaymentSignal(payment);
      paymanetUpdated(true);
    } else {
      validateData();
      paymanetUpdated(false);
    }
  }
  
  const handleCardholderNameInput = (cardholderName: string) => {
    if(isValidated) {
      setCardholderNameError(isEmpty(cardholderName))
    }
    setCardholderName(cardholderName);
  }

  const handleCreditCardInput = (creditCard: string) => {
    if(isValidated) {
      setCreditCardError(validateCreditCard(creditCard))
    }
    setCreditCard(creditCard)
  }

  const handleExpDateInput = (expDate: string) => {
    if(isValidated) {
      setExpDateError(validateExpDate(expDate))
    }
    setExpDate(expDate)
  }

  const handleCvvInput = (cvv: string) => {
    if(isValidated) {
      setCvvError(validateLength(cvv, 3, 'Wrong cvv'))
    }
    setCvv(cvv)
  }
 
  const validateData = () => {
    if(cardholderName) {
      setCardholderNameError(isEmpty(cardholderName))
    }
    if(expDate) {
      setExpDateError(validateExpDate(expDate))
    } 
    if(creditCard){
      setCreditCardError(validateCreditCard(creditCard));
    }    
    if(cvv){
      setCvvError(validateLength(cvv, 3, 'Wrong cvv'))
    }    
  }

  return (
    <ScrollView className='px-1'>
      <View className='mb-6 mt-1'>
        <CustomInput 
          onInput={(cardholderName: string) => {handleCardholderNameInput(cardholderName)}} 
          placeholder='Cardholder name'
          mask='maskName'
          error={cardholderNameError}
        />
      </View>
      <View className='mb-6 mt-1'>
        <CustomInput 
          onInput={(creditCard: string) => {handleCreditCardInput(creditCard)}} 
          placeholder='Credit card number'
          mask='maskVisaCard'
          keyboardType='number-pad'
          maxLength={19}
          error={creditCardError}
        />
      </View>
      <View style={styles.flexRow}>
          <View className='mb-6 mt-1' style={styles.expDate}>
            <CustomInput 
              onInput={(expDate: string) => {handleExpDateInput(expDate)}} 
              placeholder='Exp. date'
              mask='maskExpDate' 
              keyboardType='number-pad'
              maxLength={5}
              error={expDateError}
            />
          </View>
          <View className='mb-6 mt-1' style={styles.cvv}>
            <CustomInput 
              onInput={(cvv: string) => {handleCvvInput(cvv)}} 
              placeholder='CVV'
              error={cvvError}
              keyboardType='number-pad'
              maxLength={3}
              mask='numeric'
            />
          </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
    height: '100%'
  },
  expDate: {
    width: 150,
  },
  cvv: {
    width: 130
  }
});
export default CreditCardForm;