import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useTheme } from '../app/ThemeContext';


const Search = ({ onSearch }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  const handleInputChange = (t) => {
    setInput(t)
  }

  const handleRemoveInput = () => {
    setInput("")
    onSearch("")
    setError("")
  }

  const search = () => {

    const regex = /[^a-zA-Z0-9 ]/
      if (regex.test(input)) {
        setError("Caracteres no validos")
      } else {
        setError("")
        onSearch(input)
      }

  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          onChangeText={handleInputChange}
          style={styles.input}
          value={input}
          placeholder='Buscar producto'
          placeholderTextColor="grey"
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={search}>
            <FontAwesome name="search" size={30} style={styles.icon} marginRight={10} />
          </Pressable>
          <Pressable onPress={handleRemoveInput}>
            <MaterialIcons name="cancel" size={30} style={styles.icon} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  )
}

export default Search

const getStyles = (colors) => StyleSheet.create({
  container: {
    marginTop: 20,
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor:colors.paragraph,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    width: "75%",
    color: colors.paragraph
  },
  buttonContainer: {
    flexDirection: "row"
  },
  error: {
    color: colors.danger,
    fontWeight: "bold",
    marginLeft: 20
  },
  icon:{
    color: colors.icons
  }
})