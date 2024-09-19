import React, { createContext, useContext } from 'react';
import { lightTheme, darkTheme } from '../global/themes';
import { useSelector } from 'react-redux';

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ({ children }) => {
  const theme = useSelector(state => state.theme.mode);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
