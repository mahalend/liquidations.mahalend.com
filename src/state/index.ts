import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { load, save } from "redux-localstorage-simple";
import { createLogger } from "redux-logger";

import { isProduction } from "../analytics/Mixpanel";
import application from "./application/reducer";
import transactions from "./transactions/reducer";

const PERSISTED_KEYS: string[] = ["transactions", "slippage"];

const store = configureStore({
  reducer: {
    application,
    transactions,
  },
  middleware: isProduction
    ? [
        ...getDefaultMiddleware({ serializableCheck: false, thunk: false }),
        save({ states: PERSISTED_KEYS }),
      ]
    : [
        ...getDefaultMiddleware({ serializableCheck: false, thunk: false }),
        save({ states: PERSISTED_KEYS }),
        createLogger(),
      ],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
