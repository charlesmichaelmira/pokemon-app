import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Redux */
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { setAuthInfo, removeAuthInfo } from "./src/redux/feature/auth/actions";

import { checkUserAndAuthInfoAsync } from "./api/auth-utils";

import DrawerNavigator from "./src/navigators/DrawerNavigator";
import LoginScreen from "./src/screens/auth";
import DashboardScreen from "./src/screens/dashboard";
import DetailsScreen from "./src/screens/dashboard/DetailsScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Pressable
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 42,
          fontWeight: "bold",
          borderRadius: 6,
          backgroundColor: "#FF000022",
          padding: 10,
        }}
        onPress={() => dispatch(removeAuthInfo())}
      >
        <Text>Logout</Text>
        <MaterialCommunityIcons name="logout" size={24} color="#000000" />
      </Pressable>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Pressable
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 42,
          fontWeight: "bold",
          borderRadius: 6,
          backgroundColor: "#FF000022",
          padding: 10,
        }}
        onPress={() => dispatch(removeAuthInfo())}
      >
        <Text>Logout</Text>
        <MaterialCommunityIcons name="logout" size={24} color="#000000" />
      </Pressable>
    </>
  );
};

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerTitle: "", headerTintColor: "#000000" }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} />
      {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
  );
};

const DashboardStackNavigator = () => {
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
};

const RootStack = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  // const [authInfoAsync, setAuthInfoAsync] = useState({});

  useEffect(() => {
    const checkUserAndAuthInfo = async () => {
      /* Show loading screens if no access token stored, yet */
      try {
        const { authInfo } = await checkUserAndAuthInfoAsync();
        // setAuthInfoAsync(authInfo);
        dispatch(setAuthInfo(authInfo));
      } catch (e) {
        console.warn(e);
      }
    };

    checkUserAndAuthInfo();
    return () => null;
  }, []);

  if (Object.keys(auth?.authInfo).length !== 0) {
    // TODO: change check auth
    return <DrawerNavigator />;
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
