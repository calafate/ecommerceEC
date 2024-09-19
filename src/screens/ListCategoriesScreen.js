import { FlatList, StyleSheet, View} from 'react-native'
import  { useEffect, useState } from 'react'
import Search from '../components/Search'
import ProductItem from '../components/ProductItem'
import { useGetProductsByCategoryQuery } from '../services/shop'
import Spinner from '../components/Spinner'
import { useTheme } from '../app/ThemeContext';


const ListCategoriesScreen = ({route}) => {
  
  const theme = useTheme();
  const styles = getStyles(theme);

  const {category} = route.params
  const {data:products,isSuccess,isLoading} = useGetProductsByCategoryQuery(category)
  const [productsFiltered,setProductsFiltered] = useState([])

  useEffect(()=>{
    if(isSuccess){
      setProductsFiltered(products)
    }
  },[category,isSuccess])

  const onSearch = (input) => {
    if(input){
      setProductsFiltered(productsFiltered.filter(product => product.title.includes(input) ))
    }else{
      setProductsFiltered(products)
    }
  }

  if(isLoading) return <Spinner/>

  return (
    <View style={styles.container}>
        <Search onSearch={onSearch}/>
        <View style={styles.containerProducts}>
          <FlatList
            data={productsFiltered}
            renderItem={({item})=> <ProductItem product={item}  /> }
            keyExtractor={item=>item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        </View>
    </View>
  )
}

export default ListCategoriesScreen

const getStyles = (colors) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colors.emptyBG
  },
  containerProducts:{
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: 'space-between'
  },
})