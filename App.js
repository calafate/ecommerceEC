import { useFonts } from "expo-font";
import { fonts } from "./src/global/fonts";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import MainNavigator from "./src/navigation/MainNavigator";
import { init } from "./src/db";
import { ThemeProvider } from './src/app/ThemeContext';

export default function App() {
  
  init()

  const [fontLoaded] = useFonts(fonts);

  if (!fontLoaded) {
    return null;
  }

  return (
      <Provider store={store}>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </Provider>
  );
}

