import React from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../app/ThemeContext';

const Spinner = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={60} style={styles.spinner} />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};


const getStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.emptyBG
  },
  text: {
    fontSize: 16,
    color: colors.paragraph,
    paddingTop: 20,
  },
  spinner:{
    color: colors.main
  }
});

export default Spinner;
