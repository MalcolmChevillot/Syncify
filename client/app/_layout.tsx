import React, { useState, useRef, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "@/components/Header";
import HomeScreen from "@/screens/HomeScreen";
import LoginScreen from "@/screens/LoginScreen";
import SyncListScreen from "@/screens/SyncListScreen";
import FriendsScreen from "@/screens/FriendsScreen";
import * as SecureStore from "expo-secure-store";

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <LinearGradient
        colors={["#020024", "#090979"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#00FF88" />
      </LinearGradient>
    );
  }

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
            initialRouteName={isAuthenticated ? "Home" : "Login"}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SyncList" component={SyncListScreen} />
            <Stack.Screen name="Friends" component={FriendsScreen} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default Layout;
