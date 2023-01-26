import {combineReducers, legacy_createStore as createStore} from "redux";
import {itemsReducer} from "./reducers/items-reducer";

const rootReducer = combineReducers(
    {data: itemsReducer}
)
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)