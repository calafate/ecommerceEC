import { Pressable, StyleSheet, Text, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import { useTheme } from '../app/ThemeContext';

const { width } = Dimensions.get('window');


const Category = ({ item }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const navigation = useNavigation()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <View style={styles.mainContainer}>
      <Pressable 
        onPress={() => navigation.navigate("ListCategoriesScreen", { category: item })}
        onPressIn={() => setIsPressed(true)} 
        onPressOut={() => setIsPressed(false)}
        style={({ pressed }) => [
          styles.container,
          pressed ? styles.pressed : styles.notPressed,
        ]}
      >
      <Text style={isPressed ? styles.title : styles.title2}>
        {item}
      </Text>
    </Pressable>
    </View>
  )
}

export default Category


const getStyles = (colors) => StyleSheet.create({
  mainContainer:{
    Flex:1,
  },
  container: {
    borderColor: colors.second,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    width: (width / 2) - 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  pressed:{
    backgroundColor: colors.second,
  },
  notPressed:{
    color: 'transparent'
  },
  title:{
    color: colors.title
  },
  title2:{
    color: colors.second
  },
})
