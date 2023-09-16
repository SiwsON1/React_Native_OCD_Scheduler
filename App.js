import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import CalendarScreen from "./src/components/Calendar";
import AppNavigator from "./src/components/AppNavigator";
import PlannerScreen from "./src/screens/PlanerScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Planer" component={PlannerScreen} />
    </NavigationContainer>
  );
}

export default App;
