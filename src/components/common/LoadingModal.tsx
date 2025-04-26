import { View, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

const LoadingModal = ({isLoading}: any) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log('loading',isLoading);
    
    setShowModal(isLoading)
  }, [isLoading])
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
    >
      <View className='h-full w-full justify-center items-center bg-black/40'>
        <ActivityIndicator size={'large'} color={"#FF4416"} />
      </View>
    </Modal>
  )
}

export default LoadingModal