import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Redux */
import { Provider } from "react-redux";
import store from "./src/redux/store";

import LoginScreen from "./src/screens/auth";
import DashboardScreen from "./src/screens/dashboard";
import DetailsScreen from "./src/screens/dashboard/DetailsScreen";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  if (true) {
    // TODO: change check auth
    return (
      <Stack.Navigator
        screenOptions={{ headerTitle: "", headerTintColor: "#000000" }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DashboardScreen"
          component={DashboardScreen}
        />
        <Stack.Screen
          options={{
            headerTransparent: true,
          }}
          name="DetailsScreen"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    );
  }

  /* Fallthrough */
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerMode: "float",
          presentation: "card",
          orientation: "portrait_up",
          gestureEnabled: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}
