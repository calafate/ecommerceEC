import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { useTheme } from '../app/ThemeContext';


const Header = ({ title }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  )
}

export default Header


const getStyles = (colors) => StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.main,
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  text: {
    fontSize: 25,
    color: colors.title,
    fontFamily: 'Indie'
  },
  icon: {
    position: "absolute",
    left: 20
  }

})