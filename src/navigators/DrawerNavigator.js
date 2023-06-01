import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* Redux */
import { removeAuthInfo } from "../redux/feature/auth/actions";

import DashboardScreen from "../screens/dashboard";
import DetailsScreen from "../screens/dashboard/DetailsScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Text style={styles.usernameText}>
        <Text>{"Hello!!! @" + auth?.authInfo?.username}</Text>
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Pressable
        style={styles.logoutBtn}
        onPress={() => dispatch(removeAuthInfo())}
      >
        <Text>Logout</Text>
        <MaterialCommunityIcons name="logout" size={24} color="#000000" />
      </Pressable>
    </>
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

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerTitle: "", headerTintColor: "#000000" }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 42,
    fontWeight: "bold",
    borderRadius: 6,
    backgroundColor: "#FF000022",
    padding: 10,
  },
  usernameText: {
    marginHorizontal: 20,
    marginTop: 42,
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
