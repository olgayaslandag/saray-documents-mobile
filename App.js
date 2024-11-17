import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar, extendTheme } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import store from './app/store'
import { Provider } from 'react-redux'



import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./app/navigators/TabNavigator";
import Synchronize from "./app/components/Synchronize";
import DrawerCustomContent from "./app/navigators/DrawerCustomContent";
import routes from "./app/navigators/Routes";


const theme = extendTheme({
  fontConfig: {
    'SarayFont': {
      600: {
        normal: 'SarayFontBold'
      },
      700: {
        normal: 'SarayFontBold'
      },
      800: {
        normal: 'SarayFontBold'
      },
      900: {
        normal: 'SarayFontBold'
      },
    }
  },
  fonts: {
    heading: "SarayFont",
    body: "SarayFont",
    mono: "SarayFont",    
  },
});

SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded] = useFonts({
    'SarayFont': require('./assets/fonts/SF-Pro-Rounded-Regular.otf'),
    'SarayFontBold': require('./assets/fonts/SF-Pro-Rounded-Bold.otf'),
    'Roboto': require('./assets/fonts/SF-Pro-Rounded-Regular.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; 
  }


  const Drawer = createDrawerNavigator();
  return (
    <Provider store={store}>    
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <Synchronize />
        <StatusBar style="auto" hidden={true} />
        <NavigationContainer onReady={onLayoutRootView}>
          <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <DrawerCustomContent {...props} />}>
            <Drawer.Screen name="Main" component={TabNavigator} />
            {routes.map((route, index) => (
                <Drawer.Screen key={index} name={route.name} component={route.component} />
            ))} 
          </Drawer.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
