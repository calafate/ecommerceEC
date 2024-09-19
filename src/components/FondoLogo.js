import { StyleSheet, ImageBackground, Image, View } from 'react-native'
import React from 'react'

const FondoLogo = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backImage}
        source={require('../../assets/fondo.png')}
        resizeMode='cover'
      >
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 150, height: 150, alignSelf: 'center', marginBottom: 20, resizeMode: 'contain' }}
        />
      </ImageBackground>
    </View>
  )
}

export default FondoLogo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  backImage: {
    flex: 1,
    justifyContent: 'center',
  },
})