import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabBar from "../components/CustomTabBar";
import routes from "./Routes";




const Tab = createBottomTabNavigator();


export default function TabNavigator() {
    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{headerShown: false}}>
            {routes.map((route, index) => (
                <Tab.Screen key={index} name={route.name} component={route.component} options={route?.options} />    
            ))}            
        </Tab.Navigator>
    );
}