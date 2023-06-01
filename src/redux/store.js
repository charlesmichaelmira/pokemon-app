import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./feature/auth/reducer";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
