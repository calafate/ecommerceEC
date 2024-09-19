import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../app/ThemeContext'

const Empty = ({text}) => {

  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default Empty


const getStyles = (colors) => StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.emptyBG
    },
    text:{
        fontSize: 16,
        textAlign: 'center',
        color: colors.paragraph
    }
})