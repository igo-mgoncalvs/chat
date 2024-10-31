import { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

function LoadingIndicator () {
  const [activeId, setActiveId] = useState(0)

  useEffect(() => {
    if(activeId < 3) {
      setTimeout(() => {
        setActiveId(activeId + 1)
      }, 1000)
    } else {
      setTimeout(() => {
        setActiveId(1)
      }, 1000)
    }
  }, [activeId])

  return (
    <View style={styles.container}>
      <View style={[styles.pattener, activeId === 1 ? styles.active : styles.inactive]} />
      <View style={[styles.pattener, activeId === 2 ? styles.active : styles.inactive]} />
      <View style={[styles.pattener, activeId === 3 ? styles.active : styles.inactive]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    marginHorizontal: 12,
    marginVertical: 8
  },

  pattener: {
    width: 8,
    height: 8,
    borderRadius: 8
  },

  active: {
    backgroundColor: "#16a7fa"

  },

  inactive: {
    backgroundColor: "#9ad8fc"
  }
})

export default LoadingIndicator