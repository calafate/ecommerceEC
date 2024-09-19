import { StyleSheet, Text, TextInput, View,Image, Pressable, 
        ScrollView,Platform, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import SubmitButton from '../components/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import { useGetUserQuery } from '../services/user'
import { useUpdateUserMutation } from '../services/user'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { clearUser } from '../features/auth/authSlice'
import { deleteSession } from '../db'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { toggleTheme } from '../features/user/themeSlice'
import { useTheme } from '../app/ThemeContext'


const ProfileScreen = ({}) => {
 
  const {localId, email} = useSelector(state => state.auth)
  const [triggerUpdateUser] = useUpdateUserMutation()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {data:user, isLoading} = useGetUserQuery({localId})
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const theme = useTheme();
  const styles = getStyles(theme);
  const [submitted, setSubmitted] = useState(false)

  const onPressHandler = async () => {
      setSubmitted(!submitted)
      dispatch(toggleTheme())
      const darkTheme = !submitted
      const newUser = {darkTheme}
      await triggerUpdateUser({user:newUser, localId})
  }

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const Logout = () =>{
    deleteSession()
    dispatch(clearUser())
  }

  const updateUser = async () => {
    const newUser = {name,phone,address}
    await triggerUpdateUser({user:newUser, localId})
    Alert.alert('Perfil', 'Se han actualizado los datos correctamente')
    navigation.navigate("ProfileScreen")
  }

  if(isLoading) return <Spinner/>

  return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.OS == 'ios' ? 100 : 100}
        >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable style={styles.containerLogout} onPress={Logout}>
            <Text style={styles.textLogout}>Salir</Text>
            <MaterialIcons name="logout" size={24} style={styles.icon}/>
          </Pressable>
          <View style={styles.imageProfileContainer}>
            <View style={styles.imageContainer}>
              <Image
                source = {user !== null && user.image ? {uri: user.image} : require("../../assets/profile_default.png")}
                resizeMode='cover'
                style={styles.image}
              />
            </View>
            <Pressable 
              onPress={()=>navigation.navigate("ImageSelectorScreen")}
              style={styles.containerCameraIcon} >
              <FontAwesome name="camera" size={16} style={styles.icon} />
            </Pressable>
            <Text style={styles.email}>{email}</Text>
          </View>
          <View style={styles.datosProfileContainer}>
            <Text style={styles.profileText}>Nombre:</Text>
            <TextInput style={styles.profileInput}
                value={name}
                onChangeText={(t) => setName(t)}
              />
          </View>
          <View style={styles.datosProfileContainer}>
            <Text style={styles.profileText}>Celular:</Text>
            <TextInput style={styles.profileInput}
                value={phone}
                onChangeText={(t) => setPhone(t)}
              />
          </View>
          <View style={styles.datosProfileContainer}>
            <Text style={styles.profileText}>Dirección:</Text>
              <TextInput style={styles.profileInput}
                value={address}
                onChangeText={(t) => setAddress(t)}
            />
          </View>
          <View style={styles.themeContainerView}>
            <Text style={styles.themeText}>Color del Tema: </Text>
            <Pressable onPress={onPressHandler}
                style={styles.themeContainer}>
              <Text style={styles.themeTextButton}>
                {submitted ? 'Modo Claro' : 'Modo Oscuro'}
              </Text>
            </Pressable>
            
          </View>
          <View style={styles.butonContainer}>
            <SubmitButton title="Guardar Cambios" onPress={updateUser}/>
          </View>
        </ScrollView>     
      </KeyboardAvoidingView>
  )
}
export default ProfileScreen


const getStyles = (colors) => StyleSheet.create({
    container:{
      flex:1,
      paddingHorizontal: 20,
      backgroundColor: colors.emptyBG
    },
    imageProfileContainer:{
      alignItems: 'center',
      marginBottom: 30,
    },
    imageContainer:{
      borderWidth:1,
      borderRadius:100,
      alignItems:"center",
      borderColor:colors.paragraph
    },
    image:{
        width:150,
        height:150,
        borderRadius:100
    },
    containerCameraIcon:{
      backgroundColor: colors.emptyBG,
      justifyContent: 'center',
      alignItems: 'center',
      width: 35,
      height: 35,
      borderRadius: 3,
      position: 'absolute',
      left:120,
    },
    butonContainer:{
      marginTop: 40,
    },
    datosProfileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom:10,
    },
    profileInput:{
      borderBottomWidth: 1,
      borderBottomColor: colors.paragraph,
      fontSize: 16,
      padding:5,
      color:colors.paragraph
    },
    profileText:{
      marginRight: 20,
      fontSize: 14,
      color:colors.paragraph
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    email: {
      fontSize: 16,
      color: colors.paragraph,
    },
    containerLogout:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 10,
    },
    textLogout:{
      fontSize:18,
      textAlign:'right',
      paddingRight: 10,
      color:colors.main,
      textDecorationLine: 'underline',
      color: colors.paragraph,
    },
    themeContainerView:{
      flexDirection: 'row',
      marginTop: 20,
      alignItems: 'center'
    },
    themeContainer:{
      backgroundColor:colors.fourth,
      padding:5,
      width: '40%',
      borderRadius: 20,
    },
    themeTextButton:{
      color: colors.main,
      fontSize:14,
      textAlign: 'center',
    },
    themeText:{
      color: colors.paragraph,
      fontSize:14,
    },
    icon:{
      color: colors.icons
    }
  })

