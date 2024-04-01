import React from 'react';
import Login from "./component/Login"
import Studing_subject from './component/Studing_subject';
import Switch_controle from './component/Swich_controle';
import Home from './component/Home';
import Previous_lecture from "./component/Previous_lecture"
import Absence from './component/Absence';
import Classes from './component/Classes';
import Add_doctor from "./component/Add_doctor"
import Doctors from "./component/Doctors"
import Doctor_classes from './component/Doctor_classes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Select_subject from './component/Select_subject';
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Classes' component={Classes} />
        <Stack.Screen
          name="Studing_subject" component={Studing_subject} />
        <Stack.Screen name="Previous_lecture" component={Previous_lecture} />
        <Stack.Screen name="Absence" component={Absence} />
        <Stack.Screen
          name="Add_doctor" component={Add_doctor} />
        <Stack.Screen
          name="Doctors" component={Doctors} />
        <Stack.Screen
          name="Doctor_classes" component={Doctor_classes} />
        <Stack.Screen name="Select_subject" component={Select_subject} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

