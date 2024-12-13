import React, { useState, useRef } from "react";
import { View } from "react-native";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "@/components/Header";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import SyncListScreen from "@/screens/SyncListScreen";

const Stack = createStackNavigator();

interface Route {
  name: string;
  state?: NavigationState;
}

interface NavigationState {
  index: number;
  routes: Route[];
}

function getActiveRouteName(state: NavigationState): string {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
}

const Layout = () => {
  const [currentRouteName, setCurrentRouteName] = useState("Home");

  return (
    <NavigationIndependentTree>
      <NavigationContainer
        onStateChange={(state) => {
          const routeName = state
            ? getActiveRouteName(state as NavigationState)
            : "Home";
          setCurrentRouteName(routeName);
        }}
      >
        <View style={{ flex: 1, backgroundColor: "#020024" }}>
          {currentRouteName !== "Login" && <Header />}
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home"
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SyncList" component={SyncListScreen} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default Layout;
