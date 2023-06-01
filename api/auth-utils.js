import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_AUTH_INFO = "@auth_info";

export async function checkUserAndAuthInfoAsync() {
  try {
    const _valAuthInfo = await AsyncStorage.getItem(KEY_AUTH_INFO);

    let authInfo = _valAuthInfo != null ? JSON.parse(_valAuthInfo) : {};

    return { authInfo };
  } catch (e) {
    console.warn(e);
  }
}
