import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCodeScanner from '@/components/redeem/QrCodeScanner';
import { Stack } from 'expo-router';

const RedeemStack = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Redeem', headerTitleStyle: { color: '#FF4416' }, headerTintColor: '#FF4416'}} />
      <QRCodeScanner></QRCodeScanner>
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