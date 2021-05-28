import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {packReducer} from "./packReducer";
import {registerReducer} from "./registerReducer";
import {loginReducer} from "./loginReducer";
import { forgotReducer } from './forgotReducer';
import {cardsReducer} from "./cardsReducer";
import { searchReducer } from './searchReducer';


const rootReducer = combineReducers({
    packs: packReducer,
    register: registerReducer,
    login: loginReducer,
    forgotPassword: forgotReducer,
    cards: cardsReducer,
    search: searchReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;