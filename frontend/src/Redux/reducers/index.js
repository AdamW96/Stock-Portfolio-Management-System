import { combineReducers } from "redux";
import loginReducer from './loginReducer'

const reducers= combineReducers({
  loginState: loginReducer
})

export default reducers