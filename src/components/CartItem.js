import { Pressable, StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'
import { removeItemCart, increaseQuantity, decreaseQuantity } from '../features/cart/cartSlice'
import { useTheme } from '../app/ThemeContext'

const CartItem = ({ item }) => {

  const theme = useTheme()
  const styles = getStyles(theme)

  const dispatch = useDispatch()

  const handleRemoveProduct = (id) => {
    dispatch(removeItemCart({ id }))
  };

  const formatPrice = (num) => {
    return '$ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => handleRemoveProduct(item.id)}>
          <FontAwesome name="trash-o" size={24} style={styles.icon} marginRight={15}/>
        </Pressable>
        <View style={styles.containerText}>
          
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            <Text style={styles.priceTotal}>Total: {formatPrice(item.price*item.quantity)}</Text>
          </View>
        </View>
        <Pressable style={styles.button}
          onPress={() => dispatch(decreaseQuantity({ id: item.id }))}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Pressable style={styles.button}
          onPress={() => dispatch(increaseQuantity({ id: item.id }))}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </>
  )
}

export default CartItem


const getStyles = (colors) => StyleSheet.create({
  container: {
    width: "95%",
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  containerText: {
    width: "65%",
  },
  priceContainer:{
    flexDirection: "row",
    justifyContent: 'space-evenly',
    gap: 10,
  },
  price: {
    color: colors.paragraph,
    fontSize: 14,
  },
  priceTotal: {
    color: colors.main,
    fontSize: 14,
    color:colors.paragraph
  },
  quantity:{
    color: colors.paragraph,
  },
  title: {
    color: colors.paragraph,
    fontSize: 14
  },
  button: {
    backgroundColor: colors.fourth,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  icon:{
    color: colors.danger
  }
})


