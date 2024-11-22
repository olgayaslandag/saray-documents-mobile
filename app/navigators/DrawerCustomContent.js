import { DrawerContentScrollView } from "@react-navigation/drawer";
import LoginView from "../views/auth/LoginView";

export default function DrawerCustomContent(props) {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, paddingBottom: 10}}> 
        <LoginView />
      </DrawerContentScrollView>
    );
}