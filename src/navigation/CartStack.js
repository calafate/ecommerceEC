import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Header'
import CartScreen from '../screens/CartScreen'

const Stack = createNativeStackNavigator()

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={(() => {
        return {
          header: () => <Header title="Carrito"/>
        }
      }
    )}>
    <Stack.Screen 
      name='CartScreen' 
      component={CartScreen}
    />
    </Stack.Navigator>
  )
}

export default CartStack
