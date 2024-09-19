import { View, StyleSheet, Text, Pressable } from 'react-native'
import React, {useState} from 'react'
import { useTheme } from '../app/ThemeContext'


const SubmitButton = ({ title, onPress }) => {
  
  const theme = useTheme()
  const styles = getStyles(theme)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}
        onPressIn={() => setIsPressed(true)} 
        onPressOut={() => setIsPressed(false)}
        style={({pressed}) => [
          styles.button,
          pressed ? styles.notPressed : styles.pressed
        ]}
      >
      <Text style={[
        styles.text, 
        isPressed ? styles.titlePressed : styles.titleNotPressed ]}>
          {title}
      </Text>
    </Pressable>
  </View>
  )
}

export default SubmitButton

const getStyles = (colors) => StyleSheet.create({
  container:{
    alignSelf: 'center',
  },
  button: {
    borderColor: colors.second,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  },
  pressed:{
    backgroundColor: colors.second,
  },
  notPressed:{
    backgroundColor: 'transparent'
  },
  titlePressed:{
    color:colors.second
  },
  titleNotPressed:{
    color:colors.title
  }
})
