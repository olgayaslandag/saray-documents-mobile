import { createStackNavigator } from '@react-navigation/stack';
import RegisterView from '../views/auth/RegisterView';
import LoginView from '../views/auth/LoginView';
import { useSelector } from 'react-redux';
import ProfileView from "../views/auth/ProfileView";
import ForgetNavigator from './ForgetNavigator';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const auth = useSelector(state => state.auth.value);

  if(!auth) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Register" component={RegisterView} />      
        <Stack.Screen name="Forget" component={ForgetNavigator} />  
      </Stack.Navigator>
    );
  }  

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Profile" component={ProfileView} />
    </Stack.Navigator>
  );
}