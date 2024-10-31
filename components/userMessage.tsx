import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface IUserMessageProps {
  message: string
}


export default function UserMessage ({ message }: IUserMessageProps) {
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
    backgroundColor: '#c7ecfc',
    alignSelf: 'flex-end',
    padding: 14,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    marginRight: 12,
    marginBottom: 8,
    elevation: 2,
    maxWidth: 250
  }
})

