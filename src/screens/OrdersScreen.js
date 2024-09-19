import { StyleSheet, View, FlatList } from 'react-native'
import OrderItem from '../components/OrderItem'
import { useGetOrdersByUserQuery } from '../services/shop'
import Spinner from '../components/Spinner'
import { useSelector } from 'react-redux'
import Empty from '../components/Empty'
import { useTheme } from '../app/ThemeContext';

const OrdersScreen = () => {

  const theme = useTheme();
  const styles = getStyles(theme);
  
  const localId = useSelector(state => state.auth.localId)
  const {data:orders,isLoading} = useGetOrdersByUserQuery(localId)

  if(isLoading) return <Spinner/>
  if(!orders) return <Empty text='No tiene compras'/>

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=> <OrderItem item={item}/>}
      />
    </View>
  )
}

export default OrdersScreen

const getStyles = (colors) => StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
    backgroundColor: colors.emptyBG
  }
})