import { useState } from "react";
import { Box, Text } from "native-base";
import { ImageBackground, Dimensions } from "react-native";
import HeaderUser from "../components/header/HeaderUser";
import SearchForm from "../components/header/SearchForm";
import HomeSlider from "../components/HomeSlider";
import PushNotification from "../components/PushNotification";

const WIDTH = Dimensions.get('window').height;

export default function HomeScreen() {
  const [active, setActive] = useState({});

  return (
    <ImageBackground 
      source={active.bgimage}
      style={{ width: "100%", height: "100%" }} 
      resizeMode="cover">
      <Box px="5" flex="3">
        <HeaderUser />
        <SearchForm />
      </Box>

      <Box flex="5" style={{marginBottom: 80}}>
        <Text fontSize="24" fontWeight="700" mt={WIDTH < 650 ? 5 : 0} px="5">Yenilikler</Text>
        <HomeSlider setActive={setActive} />
      </Box>
      <PushNotification />
    </ImageBackground>
  );
}


