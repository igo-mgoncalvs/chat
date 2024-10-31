import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface IChatMessageProps {
  message: string
}

export default function ChatMessage ({ message }: IChatMessageProps) {
  return (
    <Text
      style={style.messageContainer}
    >
      {message}
    </Text>
  )
}

const style = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#d6d6d6',
    alignSelf: 'flex-start',
    padding: 14,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    marginLeft: 12,
    marginBottom: 8,
    elevation: 2,
    maxWidth: 250
  }
})

