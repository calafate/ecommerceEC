import { FlatList, StyleSheet, View } from 'react-native'
import Category from './Category'
import { useGetCategoriesQuery } from '../services/shop'
import Spinner from './Spinner'
import { useTheme } from '../app/ThemeContext';


const Categories = () => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const { data: categories, isLoading } = useGetCategoriesQuery()

  if (isLoading) return <Spinner />

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={item => item}
        renderItem={({ item }) => <Category item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  )
}

export default Categories


 const getStyles = (colors) => StyleSheet.create({
  container: {
    Flex: 1,
    padding: 10,
    
  },
  row: {
    justifyContent: 'space-between'
  },
})
