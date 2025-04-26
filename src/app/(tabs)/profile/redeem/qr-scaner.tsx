import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert, Modal, ActivityIndicator, Text } from 'react-native';
import QRCodeScanner from '@/components/redeem/QrCodeScanner';
import { Stack } from 'expo-router';
import CustomButton from '@/components/common/CustomButton';
import Redeem from '@/components/redeem/Redeem';
import { useFocusEffect } from 'expo-router';

const RedeemStack = () => {
  const [showModal, setShowModal] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showRedeemer, setShowRedeemer] = useState(true);

  useFocusEffect(
    useCallback(() => {
      /* setShowError(false);
      setShowRedeemer(false);
      setShowModal(false);
      setShowScanner(true); */
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

  const onRedeemedCompleted = (value: boolean) => {
    handleRescan()
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
        <Redeem balance={'1000000'} token={'token'} amount={'1000000'} onRedeemedCompleted={(value: boolean) => {onRedeemedCompleted(value)}} />
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