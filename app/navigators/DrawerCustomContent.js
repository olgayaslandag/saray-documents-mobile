import { DrawerContentScrollView } from "@react-navigation/drawer";
import LoginView from "../views/auth/LoginView";
import LoggedView from "../views/auth/LoggedView";
import { useSelector } from "react-redux";
import MenuView from "../views/MenuView";

export default function DrawerCustomContent(props) {
  const auth = useSelector(state => state.auth.value);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, paddingBottom: 10}}>                
        <MenuView />
      </DrawerContentScrollView>
  );
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, paddingBottom: 10}}>        
        {!auth && <LoginView />}
        {auth && <LoggedView />}        
      </DrawerContentScrollView>
    );
}