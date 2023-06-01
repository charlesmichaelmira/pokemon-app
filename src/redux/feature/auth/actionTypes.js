import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_AUTH_INFO = "@auth_info";

/* Include these functions in the export block of 'actions.js' */

export function setAuthInfo(state, action) {
  let payload = action.payload;
  state["authInfo"] = payload;

  /* Add data to persistent storage */
  AsyncStorage.setItem(KEY_AUTH_INFO, JSON.stringify(payload))
    .then((res) => null)
    .catch((e) => console.warn(e));
}

export function removeAuthInfo(state) {
  state["authInfo"] = {};

  /* Remove data from persistent storage */
  AsyncStorage.removeItem(KEY_AUTH_INFO)
    .then((res) => null)
    .catch((e) => console.warn(e));
}
