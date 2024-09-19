import { Image, Pressable, StyleSheet, Text, Dimensions, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';
import { useTheme } from '../app/ThemeContext';

const { width } = Dimensions.get('window');

const ProductItem = ({ product }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const [imageError, setImageError] = useState(false)
  const navigation = useNavigation()
  const defaultImage = require('../../assets/defaultImage.png')
  const [isPressed, setIsPressed] = useState(false)

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("ProductDetailScreen", { id: product.id })}
        style={({pressed}) => [{
          opacity: pressed ? 0.5 : 1} ,
          styles.itemContainer]}
          onPressIn={() => setIsPressed(true)} 
          onPressOut={() => setIsPressed(false)}
      >
        {imageError ?
          <Image
            style={styles.itemImage}
            source={defaultImage}
            resizeMode='contain'
          /> :
          <Image
            style={styles.itemImage}
            resizeMode='contain'
            source={{ uri: product.thumbnail }}
            onError={() => setImageError(true)}
          />
        }
        <Text style={styles.itemText}>{product.title}</Text>
      </Pressable>
    </View>
  )
}

export default ProductItem

const getStyles = (colors) => StyleSheet.create({
  container:{
    Flex:1,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: colors.paragraph,
    borderRadius: 8,
    margin: 5,
    width: (width / 2) - 20,
    padding: 10,
  },
  itemImage: {
    width: '100%',
    height: 100,
    borderRadius: 8
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color:colors.paragraph
  }
})

