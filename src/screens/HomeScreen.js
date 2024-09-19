import { StyleSheet,View} from 'react-native'
import Categories from '../components/Categories'
import { useTheme } from '../app/ThemeContext';


const HomeScreen = () => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Categories />
    </View>
  )
}

export default HomeScreen

const getStyles = (colors) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colors.emptyBG
  }
})