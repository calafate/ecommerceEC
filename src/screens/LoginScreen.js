import { Alert, StyleSheet, Text, View,Pressable, Image, ImageBackground, 
        Platform, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useLoginMutation } from '../services/auth'
import { setUser } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { loginSchema } from '../validations/loginSchema'
import { useNavigation } from '@react-navigation/native'
import { insertSession } from '../db'
import { useTheme } from '../app/ThemeContext'



const LoginScreen = ({}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorEmail,setErrorEmail] = useState("")
    const [errorPassword,setErrorPassword] = useState("")
    const [triggerLogin] = useLoginMutation()
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const theme = useTheme()
    const styles = getStyles(theme)

    const onSubmit = async () => {
        try {
          setErrorPassword("")
          setErrorEmail("")
          loginSchema.validateSync({email,password})
          const {data} = await triggerLogin({email,password})
          insertSession(data)
          dispatch(setUser({
            email:data.email,
            idToken:data.idToken,
            localId:data.localId
          }))
        } catch (error) {
          Alert.alert('Error','Credenciales incorrectas')
          console.log(error.path),
          console.log(error.message)
          switch(error.path){
            case "email":
              setErrorEmail(error.message)
              setErrorPassword("")
              break
            case "password":
              setErrorPassword(error.message)
              setErrorEmail("")
              break
            default:
              break
          }
        }
    }

  return (
    <View style={styles.main}>
      <ImageBackground 
          style={styles.backImage}
          source={require('../../assets/fondo.png')}
          resizeMode='cover'
        >
        <Image 
          source={require('../../assets/logo.png')} 
          style={{width: 120, height: 120, alignSelf:'center', marginBottom:20, resizeMode:'contain'}}
          />
        <KeyboardAvoidingView 
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'} 
          keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 100}
        >
            <InputForm
                label="Email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                isSecure={false}
                error={errorEmail}
            />
            <InputForm
                label="Password"
                value={password}
                onChangeText={(t) => setPassword(t)}
                isSecure={true}
                error={errorPassword}
            />
            <View style={styles.butonContainer}>
              <SubmitButton onPress={onSubmit} title="Iniciar Sesion"/>
            </View>
            <Text style={styles.sub}>¿ No tenes una cuenta ?</Text>
            <Pressable onPress={()=> navigation.navigate("RegisterScreen")} >
                <Text style={styles.textRegistrate}>REGISTRATE</Text>
            </Pressable>
        </KeyboardAvoidingView>
        </ImageBackground>
    </View>
  )
}

export default LoginScreen

const getStyles = (colors) => StyleSheet.create({
    main:{
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
      container:{
        backgroundColor: colors.fourth,
        alignItems: 'center',
        alignSelf: 'center',
        width: "90%",
        borderColor: colors.textColor,
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
      },
      sub:{
        fontSize:16,
        color:colors.paragraph,
        padding:10,
        marginTop:20,
        fontFamily:"Indie"
      },
      textRegistrate:{
        fontFamily:"Indie",
        fontSize:20,
        color:colors.paragraph,
        textDecorationLine: 'underline'
      },
      backImage: {
        flex: 1,
        justifyContent: 'center',
      },
      butonContainer: {
        marginTop: 20,
      }
})


