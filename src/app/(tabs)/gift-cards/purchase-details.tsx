import React from 'react'
import PurchaseDetails from '../../../components/common/PurchaseDetails';
import { router } from 'expo-router';


const PurchaseDetailsPage = () => {
  const handleButtonPress = () => {
    router.navigate('/gift-cards');
  }
  return (
    <PurchaseDetails handleButtonPress={handleButtonPress} buttonLabel='Add to cart'/>
  )
}

export default PurchaseDetailsPage;