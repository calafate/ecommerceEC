import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'


const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='LoginScreen' 
        component={LoginScreen}  
        options={{headerShown: false,}} 
      />
      <Stack.Screen 
        name='RegisterScreen' 
        component={RegisterScreen}  
        options={{headerShown: false,}} 
      />
    </Stack.Navigator>
  )
}

export default AuthStack


