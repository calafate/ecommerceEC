import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Header'
import ProfileScreen from '../screens/ProfileScreen'
import ImageSelectorScreen from '../screens/ImageSelectorScreen'

const Stack = createNativeStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator
            screenOptions={(
                () => {
                    return {
                        header: () => <Header title="Perfil"/>
                    }
                }
            )}
        >
            <Stack.Screen name='ProfileScreen' component={ProfileScreen}/>
            <Stack.Screen name='ImageSelectorScreen' component={ImageSelectorScreen}/>
        </Stack.Navigator>
  )
}

export default ProfileStack
