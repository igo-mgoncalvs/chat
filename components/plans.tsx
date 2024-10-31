import { View, StyleSheet, Image, FlatList, TouchableOpacity, Button } from 'react-native'
import { useState, useCallback, useEffect } from 'react'
import { IConversationHistory } from '@/app/(tabs)'
import uuid from 'react-native-uuid'

interface ModalPlansProps {
  onUserAction: (userMessage: IConversationHistory) => void
}

function ModalPlans ({ onUserAction }: ModalPlansProps) {
  const [show, setShow] = useState<boolean>(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  const images = [
    {
      id: 0,
      name: '700 MEGA',
      uri: 'https://i.postimg.cc/qqGYDd5C/Captura-de-tela-2024-10-31-123013.png'
    },
    {
      id: 1,
      name: '300 MEGA',
      uri: 'https://i.postimg.cc/W1NbXNhT/Captura-de-tela-2024-10-31-123038.png'
    },
    {
      id: 2,
      name: '450 MEGA',
      uri: 'https://i.postimg.cc/K80cW6ML/Captura-de-tela-2024-10-31-123101.png'
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 5000)
  }, [])

  const handleConfirm = useCallback(() => {
    onUserAction({
      id: uuid.v4(),
      from: 'USER',
      message: `${selectedPlan}`,
      order: 1,
      loading: false,
      action: ''
    })
  }, [selectedPlan])

  return show && (
    <View
      style={styles.container}
    >
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => setSelectedPlan(item.name)}
            activeOpacity={0.7}
          >
            <Image
              source={{uri: item.uri}}
              resizeMode='contain'
              style={[styles.image, item.name === selectedPlan && styles.selected]}
            />
          </TouchableOpacity>
        )}
      />

      <Button
        title='Confirmar escolha'
        onPress={handleConfirm}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    gap: 20,
    paddingTop: 35
  },

  selected: {
    borderColor: '#4aaff7',
  },

  image: {
    width: 215,
    height: 400,
    elevation: 5,
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 8
  }
})

export default ModalPlans