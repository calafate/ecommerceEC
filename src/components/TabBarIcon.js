import { StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useTheme } from '../app/ThemeContext'


const TabBarIcon = ({ text, icon, focused }) => {

  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <FontAwesome
        name={icon} size={24}
        style={focused ? styles.title : styles.noFocus}
      />
      
      <Text style={focused ? styles.title : styles.noFocus}>{text}</Text>
    </View>
  )
}

export default TabBarIcon

const getStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 5
  },
  title:{
    color: colors.title
  },
  noFocus:{
    color: colors.noFocus
  }
})