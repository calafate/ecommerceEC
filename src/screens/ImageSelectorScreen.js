import { StyleSheet, Text, View,Image, Pressable } from 'react-native'
import SubmitButton from '../components/SubmitButton'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { usePatchImageProfileMutation } from '../services/user'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useTheme } from '../app/ThemeContext'



const ImageSelectorScreen = ({}) => {

    const [image,setImage] = useState("")
    const [triggerAddImageProfile] = usePatchImageProfileMutation()
    const localId = useSelector(state => state.auth.localId)
    const navigation = useNavigation()

    const theme = useTheme();
    const styles = getStyles(theme);

    const handleTakePhoto = async () => {
      const {granted} = await ImagePicker.requestCameraPermissionsAsync()
      if(!granted) return 
      const result = await ImagePicker.launchCameraAsync({
        aspect:[3,3],
        quality:0.2,
        base64:true,
        allowsEditing:true
      })
      if(result.canceled) return
      setImage("data:image/jpg;base64," + result.assets[0].base64)

    }

    const handlePickImage = async () => {
      const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if(!granted) return 
      const resultPick = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [3, 3],
        quality: 0.2,
        base64:true,
        allowsEditing: true,
      });
      if (!resultPick.canceled) {
        setImage("data:image/jpg;base64," + resultPick.assets[0].base64)
      }
    }

    const changeImage = () => {
        triggerAddImageProfile({image,localId})
        navigation.navigate("ProfileScreen")
    }

    const handleCancel = () => {
      navigation.navigate("ProfileScreen")
    }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={image ? {uri:image}:require("../../assets/profile_default.png")}
          resizeMode='cover'
          style={styles.image}
        />
      </View >
      <View style={styles.butonContainer}>
        <Pressable onPress={handleTakePhoto} style={styles.tomarFoto}>
          <FontAwesome name="camera" size={24} style={styles.icon} /> 
          <Text style={styles.textTomarFoto}>Tomar Foto</Text>
        </Pressable>
        <Pressable onPress={handlePickImage} style={styles.tomarFoto}>
          <FontAwesome name="folder-open" size={24} style={styles.icon} />
          <Text style={styles.textTomarFoto}>Seleccionar de la biblioteca</Text>
        </Pressable>
        
      </View>
      <View style={styles.saveContainer}>
        <SubmitButton title="Confirmar cambio" onPress={changeImage}/>
      </View>
      <Pressable onPress={handleCancel} style={styles.tomarFoto}>
        <Text style={styles.textCancelar}>Cancelar</Text>
      </Pressable>
    </View>
  )
}

export default ImageSelectorScreen

const getStyles = (colors) => StyleSheet.create({
    container:{
      flex:1,
      paddingTop:70,
      alignItems:"center",
      gap:20,
      backgroundColor:colors.emptyBG
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
    butonContainer:{
      gap:20,
    },
    saveContainer:{
      marginTop:50,
    },
    tomarFoto: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    textTomarFoto:{
      fontSize: 18,
      color: colors.main,
      fontWeight: 'bold',
      color:colors.paragraph
    },
    textCancelar:{
      fontFamily: 'Indie',
      fontSize: 18,
      textDecorationLine: 'underline',
      textDecorationColor: colors.main,
      color: colors.main,
      fontWeight: 'bold',
      color:colors.paragraph
    },
    icon:{
      color: colors.icons
    }
})

