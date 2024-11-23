import { createStackNavigator } from '@react-navigation/stack';
import EnterEmail from '../views/auth/forget/EnterEmail';
import EnterCode from '../views/auth/forget/EnterCode';
import EnterPass from '../views/auth/forget/EnterPass';

import ProfileView from "../views/auth/ProfileView";
import { useSelector } from 'react-redux';


const Stack = createStackNavigator();

export default function ForgetNavigator() {
  const auth = useSelector(state => state.auth.value);

  if(!auth) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="EnterEmail" component={EnterEmail} />
        <Stack.Screen name="EnterCode" component={EnterCode} />      
        <Stack.Screen name="EnterPass" component={EnterPass} />  
      </Stack.Navigator>
    );
  }  

  return (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileView} />
    </Stack.Navigator>
  );
}