import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import MenuView from "../views/MenuView";

export default function DrawerCustomContent(props) {
  const auth = useSelector(state => state.auth.value);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, paddingBottom: 10}}>                
        <MenuView />
      </DrawerContentScrollView>
  );    
}