import { StyleSheet, StatusBar } from "react-native";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import OrdersStack from "./OrdersStack";
import ProfileStack from "./ProfileStack";
import TabBarIcon from "../components/TabBarIcon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from '../app/ThemeContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const theme = useTheme();
  const styles = getStyles(theme);
  
  return (
    <>
      <StatusBar
        barStyle='light-content' 
        backgroundColor={styles.statusBar.backgroundColor}
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={ShopStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon focused={focused} text="Productos" icon="shopping-bag"/>
              );
            },
          }}
        />
        <Tab.Screen
          name="CartStack"
          component={CartStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon focused={focused} text="Carrito" icon="shopping-cart"/>
              );
            },
          }}
        />
        <Tab.Screen
          name="OrdersStack"
          component={OrdersStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <TabBarIcon focused={focused} text="Compras" icon="list" />
              );
            },
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ focused }) => {
              return <TabBarIcon focused={focused} text="Perfil" icon="user" />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;

const getStyles = (colors) => StyleSheet.create({
  tabBar: {
    backgroundColor: colors.main,
    height: 80,
  },
  statusBar:{
    backgroundColor: colors.main,
  }
});

