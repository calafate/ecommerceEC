import { StyleSheet, Pressable } from 'react-native'
import React, {useState} from 'react'
import Icon from '@expo/vector-icons/FontAwesome'
import { useTheme } from '../app/ThemeContext'


const SubmitButtonIcon = ({ icon, onPress }) => {

  const theme = useTheme()
  const styles = getStyles(theme)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Pressable 
      onPress={onPress}
      onPressIn={() => setIsPressed(true)} 
      onPressOut={() => setIsPressed(false)}
      style={({pressed}) => [
        styles.buttonIcon,
        pressed ?  styles.notPressed : styles.pressed,
        ]}
    >
      {Icon && (
        <Icon name={icon} size={25} 
          style={[styles.iconNotPressed,
            isPressed ? styles.iconPressed : styles.iconNotPressed ]}/>
      )}
    </Pressable>
  )
}

export default SubmitButtonIcon

const getStyles = (colors) => StyleSheet.create({
  buttonIcon: {
    borderColor: colors.second,
    borderWidth: 2,
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  pressed:{
    backgroundColor: colors.second,
  },
  notPressed:{
    backgroundColor: 'transparent'
  },
  iconPressed:{
    color:colors.second
  },
  iconNotPressed:{
    color:colors.title
  }
})

