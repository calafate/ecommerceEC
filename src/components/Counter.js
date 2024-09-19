import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '../app/ThemeContext'

const Counter = ({ initialCount, onCountChange }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      onCountChange(newCount);
      return newCount;
    });
  };

  const decrement = () => {
    setCount(prevCount => {
      if (prevCount > 1) {
        const newCount = prevCount - 1;
        onCountChange(newCount);
        return newCount;
      }
      return prevCount;
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={decrement}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.count}>{count}</Text>
      <Pressable style={styles.button} onPress={increment}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};


const getStyles = (colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.fourth,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  count: {
    fontSize: 14,
    width: 30,
    textAlign: 'center',
    color:colors.paragraph
  },
});

export default Counter;
