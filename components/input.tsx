import { IConversationHistory } from '@/app/(tabs)';
import { useRef, useEffect, useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, View, Text  } from "react-native";
import uuid from 'react-native-uuid'

interface InputProps {
  onUserAction: (message: IConversationHistory) => void
}

export default function Input ({ onUserAction }: InputProps) {
  const ref = useRef<TextInput>(null)
  const [text, setText] = useState('')

  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus()
    }, 1000)
  }, [])

  const handleButton = () => {
    const userResponse: IConversationHistory = {
      id: uuid.v4(),
      from: 'USER',
      message: `${text}`,
      order: 1,
      loading: false,
      action: 'INPUT'
    }

    onUserAction(userResponse)
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={ref}
        style={styles.input}
        onChangeText={(e) => setText(e)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleButton}
      >
        <Text>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: 12,
    gap: 8
  },

  input: {
    flex: 1,
    backgroundColor: '#d9dbdb',
    borderRadius: 8,
    padding: 8
  },

  button: {
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#9ad8fc',
    borderRadius: 8
  }
})

