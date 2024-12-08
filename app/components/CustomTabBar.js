import { TouchableOpacity, View } from 'react-native';
import * as Device from 'expo-device';

import HomeIcon from "./icons/HomeIcon"
import DocumentIcon from "./icons/DocumentIcon";
import SustainabilityIcon from "./icons/SustainabilityIcon";
import CompanyIcon from "./icons/CompanyIcon";
import NotificationIcon from "./icons/NotificationIcon";
import FavoritesIcon from "./icons/FavoritesIcon";


function GetIcon({ name, isFocused, callback }) {
  const icons = {
    Home: HomeIcon,
    Documents: DocumentIcon,
    Sustainability: SustainabilityIcon,
    Company: CompanyIcon,
    Notification: NotificationIcon,
    Favorites: FavoritesIcon,
  };

  const IconComponent = icons[name] || HomeIcon;

  return (
    <TouchableOpacity onPress={callback}>
      <IconComponent width="30" height="30" fill={isFocused ? "white" : "black"} />
    </TouchableOpacity>
  );
}


export default function CustomTabBar({ state, descriptors, navigation }) {
  

  return (
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {          

          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
                      
          return (
            <View key={index} style={styles.tab}>
                <View
                style={{
                    backgroundColor: isFocused ? "red" : "transparent",
                    borderRadius: 30,
                    padding: 10,
                    borderWidth: 2, 
                    borderColor: isFocused ? "red" : "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >    
                    <GetIcon isFocused={isFocused} name={route.name} callback={onPress} />
                              
                </View>
            </View>
          );
        })}
      </View>
    );
  }

const styles = {
    tabContainer: {
        width: 300,
        height: 60,
        position: "absolute",
        bottom: Device.osName === "Android" ? 40 : 30,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#ffffff",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
};