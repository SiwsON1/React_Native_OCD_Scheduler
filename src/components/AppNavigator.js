import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from './Calendar';
import ScreenHeaderBtn from './ScreenHeaderBtn';
import PlannerScreen from '../screens/PlanerScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerLeft: () => (
          <ScreenHeaderBtn iconName="bars" handlePress={() => navigation.navigate('Planer')} />
        ),
        headerRight: () => (
          <ScreenHeaderBtn iconName="calendar" handlePress={() => navigation.navigate('Calendar')} />
        ),
        headerStyle: { backgroundColor: 'blue' },
        headerShadowVisible: false,
        headerTitle: '',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Planer" component={PlannerScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;