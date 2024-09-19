import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { shopApi } from '../services/shop'
import { authApi } from '../services/auth'
import { userApi } from '../services/user'
import { themeApi } from '../services/theme'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import themeReducer from '../features/user/themeSlice'


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [themeApi.reducerPath]: themeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware, userApi.middleware, themeApi.middleware),
})

setupListeners(store.dispatch)