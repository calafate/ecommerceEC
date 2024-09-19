import { useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Pressable} from 'react-native'
import { addItemCart } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useGetProductQuery } from '../services/shop'
import SubmitButtonIcon from '../components/SubmitButtonIcon'
import Spinner from '../components/Spinner'
import Counter from '../components/Counter'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useTheme } from '../app/ThemeContext';

const ProductDetailScreen = ({route}) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const {id} = route.params
  const {data:product,isLoading} = useGetProductQuery(id)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [imageError, setImageError] = useState(false)
  const defaultImage = require('../../assets/defaultImage.png')
  const [quantity, setQuantity] = useState(1);

const goBack = () => {
  navigation.goBack()
}

  const handleAddItemCart = () => {
    dispatch(addItemCart({...product, quantity}))
    navigation.navigate("CartStack")
  }

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const formatPrice = (num) => {
    return '$ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  if(isLoading) return <Spinner/>

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerDetail}>
        <View style={styles.titleContainer}>
          <Pressable onPress={goBack} style={styles.goBack}>
            <FontAwesome name="chevron-left" size={24} style={styles.icon} />
          </Pressable>
          <Text style={styles.title}>{product.title}</Text>
        </View>
        {imageError ?
        <Image
          style={styles.image}
          source={defaultImage}
          resizeMode='contain'
        /> : 
        <Image
          style={styles.image}
          resizeMode='contain'
          source={{uri:product.thumbnail}}
          onError={() => setImageError(true)}
        />
        }
        <View style={styles.containerText}>
          <Text style={styles.description}>{product.description}</Text>
          <View style={styles.cantidad}>
            <Text style={styles.price}>Precio:  {formatPrice(product.price)}</Text>
            <Counter initialCount={quantity} onCountChange={handleQuantityChange} />
          </View>
          <Text style={styles.price}>Total:  {formatPrice(product.price*quantity)}</Text>
        </View>
        <View style={styles.containerButton}>
          <SubmitButtonIcon onPress={handleAddItemCart} icon="shopping-cart"/>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProductDetailScreen

const getStyles = (colors) => StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor: colors.emptyBG
  },
  containerDetail:{
  },
  containerText:{
    width:"95%",
    gap:20,
    marginHorizontal:"5%"
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    paddingBottom:10,
  },
  title:{
    width: '90%',
    fontSize:18,
    textAlign: 'left',
    color: colors.paragraph
  },
  goBack: {
    paddingRight:10,
  },
  description:{
    fontSize:16,
    color: colors.paragraph
  },
  cantidad:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
    
  },
  price:{
    color: colors.main,
    fontSize:16,
    fontWeight:'bold',
    color: colors.paragraph
  },
  image:{
    width:"100%",
    height:250,
    marginVertical:10
  },
  containerButton:{
    marginTop: 30,
    alignItems:'flex-end'
  },
  icon:{
    color: colors.icons
  }
})