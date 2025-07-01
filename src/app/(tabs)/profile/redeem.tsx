import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import QRCodeScanner from '@/components/redeem/QrCodeScanner';
import CustomButton from '@/components/common/CustomButton';
import Redeem from '@/components/redeem/Redeem';
import Refund from '@/components/redeem/Refund';

const RedeemStack = () => {
  const [showModal, setShowModal] = useState(false);
  const [showScanner, setShowScanner] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showRedeemer, setShowRedeemer] = useState(false);
  const [showRefund, setShowRefund] = useState(false);
  const [lastTransactionDetails, setLastTransactionDetails] = useState({amount: '100 000', date: '15 February 2025', redeemer: 'John Doe'})

  useFocusEffect(
    useCallback(() => {
      setShowError(false);
      setShowRedeemer(false);
      setShowModal(false);
      setShowScanner(true);
      setShowRefund(false);
    }, [])
  );

  const handleScan = (data: string) => {
    console.log("data", data);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setShowScanner(false)
      const result = 'error'
      if (result == 'error') {
        setShowError(true)
      }
    }, 2000);
  }

  const handleRescan = () => {
    setShowError(false)
    setShowRedeemer(false)
    setShowScanner(true)
  }

  const onRefundCompleted = (value: boolean) => {
    if(true) {
      /* Update balance */
    }
    setShowRefund(false)
    setShowRedeemer(true)
  }

  const onRefund = () => {
    setShowRefund(true)
    setShowRedeemer(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Redeem', headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      {
        showScanner && 
        <QRCodeScanner onScan={handleScan}></QRCodeScanner>
      }
      {
        showError &&
        <View className='w-full h-full p-6 bg-white'>
          <Text className='text-xl text-secondary-800 flex-1 mt-12 self-center'>Qr code is invalid or exired!</Text>

          <CustomButton label="Scan again" handlePress={handleRescan} />
        </View>
      }
      {
        showRedeemer &&
        <Redeem balance={'1000000'} token={'token'} amount={'1000000'} onRedeemedCompleted={handleRescan} onRefund={onRefund} />
      }
      {
        showRefund &&
        <Refund lastTransactionDetails={lastTransactionDetails} onRefundCompleted={onRefundCompleted} />
      }
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
      >
        <View className='h-full w-full justify-center items-center bg-black/40 pb-16'>
        <View className=''>
          <ActivityIndicator size={'large'} color={"#FF4416"} />
        </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})
export default RedeemStack;