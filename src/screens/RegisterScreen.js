import { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native"
import InputForm from "../components/InputForm"
import SubmitButton from "../components/SubmitButton"
import { useRegisterMutation } from "../services/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../features/auth/authSlice"
import { registerSchema } from "../validations/registerSchema"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from '../app/ThemeContext'


const RegisterScreen = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [triggerRegister] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const theme = useTheme()
  const styles = getStyles(theme)

  const onSubmit = async () => {
    try {
      setErrorEmail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      registerSchema.validateSync({ email, password, confirmPassword });
      const { data } = await triggerRegister({ email, password });
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      );
    } catch (error) {
      console.log(error)
      Alert.alert('Error','Email registrado')
      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          setErrorPassword("");
          setErrorConfirmPassword("");
          break;
        case "password":
          setErrorEmail("");
          setErrorPassword(error.message);
          setErrorConfirmPassword("");
          break;
        case "confirmPassword":
          setErrorEmail("");
          setErrorPassword("");
          setErrorConfirmPassword(error.message);
          break;
      }
    }
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        style={styles.backImage}
        source={require("../../assets/fondo.png")}
        resizeMode="cover"
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{
            width: 120,
            height: 120,
            alignSelf: "center",
            marginBottom: 20,
            resizeMode: "contain",
          }}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS == "ios" ? 100 : 100}
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
          <InputForm
            label="Confirmar Password"
            value={confirmPassword}
            onChangeText={(t) => setConfirmPassword(t)}
            isSecure={true}
            error={errorConfirmPassword}
          />
          <View style={styles.butonContainer}>
            <SubmitButton onPress={onSubmit} title="Registrarme" />
          </View>
          <Pressable onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.inicio}>Incio de sesion</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

const getStyles = (colors) => StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  container: {
    backgroundColor: colors.fourth,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    borderColor: colors.textColor,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Montserrat",
  },
  sub: {
    fontSize: 14,
    fontFamily: "Montserrat",
  },
  inicio: {
    fontSize: 20,
    fontFamily: "Indie",
    color: colors.paragraph,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  backImage: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    color: colors.paragraph,
  },
  butonContainer: {
    marginTop: 20,
  }
});
