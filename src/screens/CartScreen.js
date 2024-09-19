import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import CartItem from '../components/CartItem'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { usePostOrderMutation } from '../services/shop'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import SubmitButton from '../components/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import Empty from '../components/Empty'
import { useTheme } from '../app/ThemeContext';


const CartScreen = ({}) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const navigation = useNavigation()
  const cart = useSelector(state => state.cart)
  const userId = useSelector(state => state.auth.localId)
  const [triggerPostOrder] = usePostOrderMutation()
  const dispatch = useDispatch()
  const isCartEmpty = cart.items && cart.items.length === 0;

  const handleAddOrder = () => {
    if (!isCartEmpty) {
      const createdAt = new Date().toLocaleString()
      const order = {...cart, createdAt}
      dispatch(clearCart())
      triggerPostOrder({userId, order})
      navigation.navigate("OrdersStack")
    }
  }

  const formatPrice = (num) => {
    return '$ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  if (isCartEmpty) return <Empty text='Carrito Vacío'/>

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable onPress={() => dispatch(clearCart())}>
            <FontAwesome name="trash-o" size={30} style={styles.icon} />
          </Pressable>
          <Text style={styles.textTotal}>Total: {formatPrice(cart.total)}</Text>
        </View>
      <FlatList
        data={cart.items}
        keyExtractor={item => item.id}
        renderItem={({item})=> <CartItem item={item}/> }
        style={styles.item}
      />
      <View style={styles.containerConfirm}>
        
        <SubmitButton onPress={handleAddOrder} title='Comprar'/>
      </View>
    </View>
  )
}

export default CartScreen

const getStyles = (colors) => StyleSheet.create({
    container:{
        justifyContent:"space-between",
        flex:1,
        backgroundColor: colors.emptyBG
    },
    containerConfirm:{
        padding:20,
        justifyContent:"center",
        alignItems: 'center',
    },
    textTotal:{
        color:colors.main,
        fontSize:18,
        fontWeight:'bold',
        textAlign: 'right',
    },
    headerContainer:{
      backgroundColor: colors.fourth,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    },
    item:{
    },
    icon:{
      color: colors.danger
    }
})

