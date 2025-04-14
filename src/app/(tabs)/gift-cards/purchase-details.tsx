import React, { useState } from 'react'
import PurchaseDetails from '../../../components/common/PurchaseDetails';
import { RelativePathString, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';


const PurchaseDetailsPage = () => {
  const [showModal, setShowModal] = useState(false)
  const handleButtonPress = () => {
    setShowModal(true)
  }
  
  const navigateTo = (route: RelativePathString) => {
    setShowModal(false)
    router.navigate(route);
  }

  return (
    <SafeAreaView edges={["left", "right"]} className='h-full bg-white'>
      <PurchaseDetails handleButtonPress={handleButtonPress} buttonLabel='Add to cart'/>
      {
      showModal &&
        <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        >
          <View className='justify-center items-center w-full h-full bg-white'>
            <View className='px-12 py-8 rounded-xl bg-white' style={styles.shadow}>
              <TouchableOpacity onPress={()=>{navigateTo('/gift-cards' as RelativePathString)}} activeOpacity={0.5}>
                <Text className='text-xl text-primary-700 underline my-5 text-center'>Keep shopping</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{navigateTo('/basket' as RelativePathString)}} activeOpacity={0.5}>
                <Text className='text-xl text-primary-700 underline my-5 text-center'>Go to to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,

    elevation: 10,
    ...Platform.select({
      android: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 1,
      }
    })
  }
});

export default PurchaseDetailsPage;