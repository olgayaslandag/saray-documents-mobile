import { useState, useEffect } from "react";
import { ImageBackground, Dimensions, View, Text, StyleSheet } from "react-native";
import HeaderUser from "../components/header/HeaderUser";
import SearchForm from "../components/header/SearchForm";
import HomeSlider from "../components/HomeSlider";
import PushNotification from "../components/PushNotification";
import { useDispatch } from "react-redux";
import { initializeAuth } from "../store/authSlice";
import { initializeFavs } from "../store/favSlice";
import * as Device from 'expo-device';

const WIDTH = Dimensions.get('window').height;

export default function HomeScreen() {
  const [active, setActive] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeFavs())
  }, []);

  return (
    <ImageBackground 
      source={active.bgimage}
      style={{ width: "100%", height: "100%" }} 
      resizeMode="cover">
      <View style={styles.header.container}>
        <HeaderUser />
        <SearchForm />
      </View>

      <View style={styles.content.container}>
        <Text style={styles.content.title} >Yenilikler</Text>
        <HomeSlider setActive={setActive} />
      </View>
      <PushNotification />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    container: {
      flex: 3,
      paddingHorizontal: 20,
      paddingTop: Device.osName === "iOS" ? 30 : 0
    }
  },
  content: {
    container: {
      flex: 5,
      marginBottom: 80
    },
    title: {
      marginTop: WIDTH < 650 ? 5 : 0,
      fontSize: 24,
      fontWeight: '700',
      paddingHorizontal: 20,      
    }
  }
});
