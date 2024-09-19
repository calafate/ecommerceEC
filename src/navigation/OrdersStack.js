import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Header'
import OrdersScreen from '../screens/OrdersScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'

const Stack = createNativeStackNavigator()

const OrdersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={(() => {
        return {
          header: () => <Header title="Compras"/>
        }
      }
    )}>
      <Stack.Screen 
        name='OrdersScreen' 
        component={OrdersScreen}
      />
      <Stack.Screen 
        name='OrderDetailScreen' 
        component={OrderDetailScreen}
      />
    </Stack.Navigator>
  )}

export default OrdersStack
