import { Pressable, StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useGetOrderByUserAndOrderIdQuery } from '../services/shop'
import Spinner from '../components/Spinner'
import {  useSelector } from 'react-redux'
import { useTheme } from '../app/ThemeContext';
import FontAwesome from '@expo/vector-icons/FontAwesome'

const OrderDetailScreen = ({route}) => {
  const navigation = useNavigation()

  const theme = useTheme();
  const styles = getStyles(theme);
  
  const goBack = () => {
    navigation.goBack()
  }
    const {orderId} = route.params
    const localId = useSelector(state => state.auth.localId)
    const {data:order,isLoading} = useGetOrderByUserAndOrderIdQuery({localId, orderId})
    
    const formatPrice = (num) => {
      return '$ ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    
    const Item = ({ item }) => (
      <View style={styles.item}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.info}>
          <View style={styles.info1}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.info2}>
            <Text style={styles.quantity}>Cant.: {item.quantity}</Text>
            <Text style={styles.price}> {formatPrice(item.price)}</Text>
            <Text style={styles.totalPrice}> {formatPrice(item.price * item.quantity)}</Text>
          </View>
        </View>
      </View>
    );
    
  
  if(isLoading) return <Spinner/>

  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <Pressable onPress={goBack} >
          <FontAwesome name="chevron-left" size={24} style={styles.icon} />
        </Pressable>
        <Text style={styles.headerTitle}>Detalle de la Compra</Text>
      </View>
      <Text style={styles.total}>Total Orden: {formatPrice(order.total)}</Text>
      <Text style={styles.fecha}>Fecha de Compra: {order.createdAt}</Text>
      <View style={styles.containerData}>
        <FlatList
          data={order.items}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
    </View>
      
    </View>
  )
}

export default OrderDetailScreen

const getStyles = (colors) => StyleSheet.create({
  container:{
    flex:1,
    padding: 10,
    backgroundColor: colors.emptyBG,
  },
  headerTitle:{
    fontFamily: 'Indie',
    fontSize: 22,
    textAlign: 'center',
    padding:10,
    textDecorationLine: 'underline',
    color: colors.paragraph
  },
  containerData: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  fecha:{
    fontSize:14,
    textAlign:'center',
    color: colors.paragraph
  },
  total:{
    fontSize:18,
    textAlign:'center',
    fontWeight:'bold',
    color: colors.paragraph
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.paragraph,
    paddingBottom: 10,
    alignItems: 'center'
  },
  thumbnail: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 10,
  },
  info: {
    flex: 1,
  },
  info1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    color: colors.paragraph
  },
  quantity:{
    color: colors.paragraph
  },
  price:{
    color: colors.paragraph
  },
  totalPrice:{
    color: colors.paragraph
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingRight:10,
  },
  icon:{
    color: colors.icons
  }
})

