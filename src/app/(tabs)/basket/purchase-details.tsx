import React from 'react'
import PurchaseDetails from '../../../components/common/PurchaseDetails';
import { router } from 'expo-router';


const PurchaseDetailsPage = () => {

  const handleButtonPress = () => {
    router.back();
  }
  return (
    <PurchaseDetails handleButtonPress={handleButtonPress} />
  )
}

export default PurchaseDetailsPage;