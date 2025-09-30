import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { simsApi } from './services/simsApi'
import simReducer from './services/simsSlice'
import userReducer from './services/userSlice'
import { userApi } from './services/userApi'
import { relationshipsApi } from './services/relationshipsApi';
import { treeApi } from './services/treeApi';
import treeReducer from './services/treeSlice'

const persistConfig = {
    key:'root',
    storage
}

const rootReducer =  combineReducers({
    sims: simReducer,
    user: userReducer,
    trees: treeReducer,
    [simsApi.reducerPath]: simsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [relationshipsApi.reducerPath]: relationshipsApi.reducer,
    [treeApi.reducerPath]: treeApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            simsApi.middleware, 
            userApi.middleware, 
            relationshipsApi.middleware,
            treeApi.middleware
        )
})


const persistor = persistStore(store)

export { store, persistor }