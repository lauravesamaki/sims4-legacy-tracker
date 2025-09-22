import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { simsApi } from './services/simsApi'
import simReducer from './services/simsSlice'
import userReducer from './services/userSlice'
import treeReducer from './services/treeSlice'
import { userApi } from './services/userApi'

const persistConfig = {
    key:'root',
    storage
}

const rootReducer =  combineReducers({
    sims: simReducer,
    user: userReducer,
    trees: treeReducer,
    [simsApi.reducerPath]: simsApi.reducer,
    [userApi.reducerPath]: userApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(simsApi.middleware, userApi.middleware)
})


const persistor = persistStore(store)

export { store, persistor }