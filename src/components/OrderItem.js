import { Pressable, StyleSheet, Text, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../app/ThemeContext'


const OrderItem = ({ item }) => {

  const theme = useTheme()
  const styles = getStyles(theme)

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('OrderDetailScreen', {orderId:item.id})
  }
  
  const formatPrice = (num) => {
    return '$ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  return (
    <Pressable style={styles.container}
      onPress={() => handlePress()}>
      <View style={styles.containerText}>
        <Text style={styles.date}>{item.createdAt}</Text>
        <Text style={styles.total}>Total: {formatPrice(item.total)} </Text>
      </View>
      <FontAwesome name="arrow-right" size={22} style={styles.icon} />
    </Pressable>
  )
}

export default OrderItem


const getStyles = (colors) => StyleSheet.create({
  container: {
    borderColor: colors.paragraph,
    borderBottomWidth: 1,
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerText: {
    gap: 10
  },
  date: {
    fontSize: 16,
    color: colors.paragraph
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.paragraph
  },
  icon:{
    color: colors.icons
  }
})