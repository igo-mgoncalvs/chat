import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Button } from 'react-native';
import uuid from 'react-native-uuid'

import UserMessage from '@/components/userMessage';
import ChatMessage from '@/components/chatMessage';
import ChatActions, { ActionsNames } from '@/components/chatActions';
import Animated, { Easing, LinearTransition, SlideInDown } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LoadingIndicator from '@/components/loading';

export interface IConversationHistory {
  id: string | number[],
  from: string,
  message: string,
  order: number,
  loading: boolean,
  action: ActionsNames
}

export default function HomeScreen() {
  const [conversationHistory, setConversationHistory] = useState<IConversationHistory[]>([])
  const [apiResponse, setApiResponse] = useState<IConversationHistory[]>([])
  const [number, setNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [activedAction, setActivedAction] = useState<ActionsNames>('')

  const sendMessageApi = useCallback(() => {
    const newMessage: IConversationHistory[] = [
      {
        id: uuid.v4(),
        from: 'CHAT_API',
        message: `Olá, que bom ter você aqui`,
        order: 0,
        loading: false,
        action: ''
      },
      {
        id: uuid.v4(),
        from: 'CHAT_API',
        message: `Para começarmos digite o seu CPF`,
        order: 1,
        loading: false,
        action: 'INPUT'
      }
    ];

    setApiResponse([...newMessage, ...conversationHistory]); // Adiciona no topo do array invertido
  }, [conversationHistory])

  useEffect(() => {
    const numberOfMessagesReceived = apiResponse.length

    if(numberOfMessagesReceived > 0) {
      const list = apiResponse

      const getMessage = list.splice(0, 1)

      setTimeout(() => {
        setConversationHistory([...getMessage, ...conversationHistory])
        setLoading(list.length > 0 || getMessage[0].loading)
        setApiResponse(list)

        if(getMessage[0].action) {
          setTimeout(() => {
            setActivedAction(getMessage[0].action)
          }, 1500)
        }
      }, 1500)
    }
  }, [apiResponse, conversationHistory])

  const renderMessage = useCallback(({ item }: { item: IConversationHistory }) => (
    <Animated.View
      entering={SlideInDown.easing(Easing.inOut(Easing.ease))}
      style={{ borderRadius: 4 }}>
      {item.from === 'CHAT_API' ? (
        <>
          <ChatMessage
            message={item.message}
          />
        </>
      ): (
        <UserMessage
          message={item.message}
        /> 
      )}
    </Animated.View>
  ), [loading])

  const handleUserAction = useCallback((userMessage: IConversationHistory) => {

    setConversationHistory([userMessage, ...conversationHistory])
    setActivedAction('')
    setLoading(true)

    setTimeout(() => {
      let response: IConversationHistory = {
        id: uuid.v4(),
        from: 'CHAT_API',
        message: `Bem vindo a Giga+`,
        order: 1,
        loading: false,
        action: ''
      }

      let responseArray: IConversationHistory[] | [] = []

      switch (number) {
        case 1:
          response = {
            id: uuid.v4(),
            from: 'CHAT_API',
            message: `Ótimo, agora o seu nome completo`,
            order: 1,
            loading: false,
            action: 'INPUT'
          }
          break;
        case 2:
          response = {
            id: uuid.v4(),
            from: 'CHAT_API',
            message: `Aguarde um instante e selecione um plano, na tela a seguir`,
            order: 1,
            loading: true,
            action: 'PLANS'
          }
          break;

        case 3:
          responseArray = [
            {
              id: uuid.v4(),
              from: 'CHAT_API',
              message: `Por favor, aguarde um momento enquanto confirmo sua contratação.`,
              order: 1,
              loading: false,
              action: ''
            },
            {
              id: uuid.v4(),
              from: 'CHAT_API',
              message: `Contrato confirmado`,
              order: 1,
              loading: false,
              action: ''
            },
            {
              id: uuid.v4(),
              from: 'CHAT_API',
              message: `Em alguns dias, realizaremos a instalação do seu equipamento`,
              order: 1,
              loading: false,
              action: ''
            },
            {
              id: uuid.v4(),
              from: 'CHAT_API',
              message: `Aguarde a visita do técnico para a instalação`,
              order: 1,
              loading: false,
              action: ''
            },
            {
              id: uuid.v4(),
              from: 'CHAT_API',
              message: `Bem vindo a Giga+`,
              order: 1,
              loading: false,
              action: ''
            }
          ]
          break;
      
        default:
          response = {
            id: uuid.v4(),
            from: 'CHAT_API',
            message: `Bem vindo a Giga+`,
            order: 1,
            loading: false,
            action: ''
          }
          break;
      }

      if(responseArray.length > 0) {
        setApiResponse(responseArray)
      } else {
        setApiResponse([response])
        setNumber(number + 1)
      }
    }, 1000)
  }, [conversationHistory, number])

  return (
    <GestureHandlerRootView>
      <View
        style={styles.container}
      >
        <View
          style={{
            gap: 20,
            marginTop: 25
          }}
        >
          {conversationHistory.length < 1 ? (
            <Button
              title='Iniciar teste'
              onPress={sendMessageApi}
            />
          ) : (
            <Button
              title='Reiniciar'
              onPress={() => {
                setConversationHistory([])
                setActivedAction('')
                setNumber(1)
              }}
            />
          )}
        </View>

        {conversationHistory.length > 0 ? (
          <>
            <Animated.FlatList
              data={conversationHistory}
              renderItem={renderMessage}
              keyExtractor={(item) => item.id.toString()}
              inverted
              itemLayoutAnimation={LinearTransition.easing(Easing.inOut(Easing.ease))}
            />
            {loading && (
              <LoadingIndicator />
            )}
          </>
        ): (
          <View
            style={{
              flex: 1,
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                alignSelf: 'flex-end'
              }}
            >
              <LoadingIndicator />
            </View>
          </View>
        )}

        <ChatActions
          actionName={activedAction}
          onUserAction={handleUserAction}
        />
      </View>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    justifyContent: 'flex-end',
  },
});
