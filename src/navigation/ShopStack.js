import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import ListCategoriesScreen from '../screens/ListCategoriesScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import Header from '../components/Header'

const Stack = createNativeStackNavigator()

const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={(
        ({ route }) => {
          return {
            header: () => <Header title={
              route.name === "HomeScreen" ?
                "Elena Capozzolo"
                :
                route.name === "ListCategoriesScreen" ?
                route.params.category
                  : 
                  "Detalle del Producto"
            } />
          }
        }
      )}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='ListCategoriesScreen' component={ListCategoriesScreen} />
      <Stack.Screen name='ProductDetailScreen' component={ProductDetailScreen} />
    </Stack.Navigator>
  )
}

export default ShopStack
