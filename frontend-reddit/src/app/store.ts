import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from '../features/users/usersSlice';
import { postReducer } from '../features/posts/postSlice';

const usersPersistConfig = {
  key: 'reddit:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, userReducer),
  posts: postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
