import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Pressable,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { setAuthInfo } from "../../redux/feature/auth/actions";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username !== "" && password !== "") {
      Alert.alert("Success", "Logged in successfully!", [
        {
          text: "Proceed",
          style: "default",
          onPress: () => {
            dispatch(setAuthInfo({ username, password }));
          },
        },
      ]);
    } else {
      Alert.alert("Error", "Invalid username or password.");
    }
    Keyboard.dismiss();
  };

  const onPressPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ImageBackground
      source={require("../../../assets/png/pokemon_bg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
          />
          <View style={[styles.input, { flexDirection: "row" }]}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable onPress={onPressPassword}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="#000000"
              />
            </Pressable>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text>{"Login"}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  input: {
    // flex: 1,
    width: "80%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginVertical: 12,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "80%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginVertical: 12,
    alignItems: "center",
  },
});
