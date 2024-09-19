import { StyleSheet, Text, View, TextInput } from 'react-native'
import { useTheme } from '../app/ThemeContext'

const InputForm = ({ label, value, onChangeText, isSecure, error }) => {

  const theme = useTheme()
  const styles = getStyles(theme)
  
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={isSecure}
        placeholder={label}
        autoComplete='false'
      />
      <View><Text style={styles.error}>{error ? error : ""} </Text></View>
    </View>
  )
}

export default InputForm

const getStyles = (colors) => StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "90%",
    borderBottomWidth: 1,
    padding: 5,
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: "5%",
    marginVertical: 10
  },
  error: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.danger,
    fontFamily: "MontserratItalic",
    marginLeft: 20
  }
})