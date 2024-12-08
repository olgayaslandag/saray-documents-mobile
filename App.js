import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import store from './app/store'
import { Provider } from 'react-redux'
import { StatusBar, Text } from "react-native";


import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./app/navigators/TabNavigator";
import Synchronize from "./app/components/Synchronize";
import DrawerCustomContent from "./app/navigators/DrawerCustomContent";
import routes from "./app/navigators/Routes";
import AuthNavigator from "./app/navigators/AuthNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Thin': require('./assets/fonts/SF-Pro-Rounded-Thin.otf'),
    'Medium': require('./assets/fonts/SF-Pro-Rounded-Medium.otf'),
    'Regular': require('./assets/fonts/SF-Pro-Rounded-Regular.otf'),
    'Bold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'Black': require('./assets/fonts/SF-Pro-Rounded-Black.otf'),
    'Oswald': require('./assets/fonts/Oswald-Regular.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();  
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }  

  if (fontsLoaded) {
    Text.defaultProps = {
      ...(Text.defaultProps || {}),
      style: { fontFamily: 'Oswald' },
    };
  }
  


  const Drawer = createDrawerNavigator();
  return (
    <Provider store={store}>    
      <SafeAreaProvider>
        <Synchronize />
        <StatusBar style="auto" hidden={true} />
        <NavigationContainer onReady={onLayoutRootView}>
          <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerCustomContent {...props} />}>
            <Drawer.Screen name="Main" component={TabNavigator} />
            {routes.map((route, index) => (
                <Drawer.Screen key={index} name={route.name} component={route.component} />
            ))}
            <Drawer.Screen name="Auth" component={AuthNavigator} />          
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
