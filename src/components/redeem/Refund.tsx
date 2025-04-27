import { View, Text, StyleSheet, Platform, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@components/common/CustomButton';

const Refund = ({ lastTransactionDetails, onRefundCompleted }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const onRefundConfirmation = () => {
    setShowConfirmationModal(false)
    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      setShowSuccessModal(true)
      //setShowErrorModal(true)
    }, 2000);
  }

  const refunded = () => {
    onRefundCompleted(true)
  }

  return (
    <View className='flex w-full h-full bg-white pt-6' style={styles.container}>
      <View className="flex bg-white px-6 pb-10 flex-1">
        <Text className='text-lg text-secondary-800 font-pregular mb-6'>Last transaction:</Text>
        <View className='flex flex-row justify-between mb-3'>
          <Text className='text-lg text-secondary-600 font-pregular'>Amount:</Text>
          <Text className='text-lg text-secondary-900 font-pregular'>{lastTransactionDetails?.amount}</Text>
        </View>
        <View className='flex flex-row justify-between mb-3'>
          <Text className='text-lg text-secondary-600 font-pregular'>Date:</Text>
          <Text className='text-lg text-secondary-900 font-pregular'>{lastTransactionDetails?.date}</Text>
        </View>
        <View className='flex flex-row justify-between mb-3'>
          <Text className='text-lg text-secondary-600 font-pregular'>Refunded by:</Text>
          <Text className='text-lg text-secondary-900 font-pregular'>{lastTransactionDetails?.redeemer}</Text>
        </View>
        <View className='my-6 mt-auto'>
          <CustomButton label='Back to redeem' handlePress={()=>{onRefundCompleted(false)}} />
        </View>
        <TouchableOpacity onPress={()=>{setShowConfirmationModal(true)}}>
          <Text className='text-lg text-primary-700 text-center'>Refund</Text>
        </TouchableOpacity>
      </View>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSuccessModal}
      >
        <View className='h-full w-full justify-center items-center bg-black/40 pb-16'>
          <View className='w-[85%] p-6 rounded-xl bg-white'  style={styles.shadow}>
            <Text className='text-xl text-primary-700 font-pregular mb-6'>Refunded!</Text>
            <View className='flex flex-row justify-between mb-4'>
              <Text className='text-lg text-secondary-600 font-pregular'>Refunded:</Text>
              <Text className='text-lg text-secondary-900 font-pregular'>100 000</Text>
            </View>
            <View className='flex flex-row justify-between mb-12'>
              <Text className='text-lg text-secondary-600 font-pregular'>New balance:</Text>
              <Text className='text-lg text-secondary-900 font-pregular'>1 000 000</Text>
            </View>
            <CustomButton label='OK' handlePress={refunded} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showErrorModal}
      >
        <View className='h-full w-full justify-center items-center bg-black/40 pb-16'>
          <View className='w-[85%] p-6 rounded-xl bg-white'  style={styles.shadow}>
            <Text className='text-xl text-primary-700 font-pregular mb-6'>Oops!</Text>
            <View className='flex flex-row justify-between mb-12'>
              <Text className='text-lg text-secondary-600 font-pregular'>Couldn't refund.</Text>
            </View>
            <CustomButton label='Ok' handlePress={()=>{setShowErrorModal(false)}} />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmationModal}
      >
        <View className='h-full w-full justify-center items-center bg-black/40 pb-16'>
          <View className='w-[85%] p-6 rounded-xl bg-white'  style={styles.shadow}>
            <Text className='text-xl text-primary-700 font-pregular mb-6'>Confirm refund</Text>
            <View className='flex flex-row justify-between mb-3'>
              <Text className='text-lg text-secondary-600 font-pregular'>Amount to refund:</Text>
              <Text className='text-lg text-secondary-900 font-pregular'>100 000</Text>
            </View>
            <View className='mb-6 mt-8'>
              <CustomButton label='Refund' handlePress={onRefundConfirmation} />
            </View>
            <TouchableOpacity onPress={()=>{setShowConfirmationModal(false)}}>
              <Text className='text-lg text-primary-700 text-center'>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 50
      }
    })
  },
  dropdown: {
    ...Platform.select({
      android: {
        marginLeft: -15
      }
    })
  },
  phonePrefix: {
    paddingLeft: 30
  },
  shadow: {
    shadowColor: "rgba(152, 152, 152, 0.5)",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 7,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
})

export default Refund;