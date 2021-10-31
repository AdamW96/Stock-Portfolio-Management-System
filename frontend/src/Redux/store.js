import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import reducers from "./reducers"

// export const store = createStore(
//   reducers,
//   {},
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(thunk)
// )
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export  const store = createStore(
  reducers, /* preloadedState, */
  {},
  composeEnhancers(
    applyMiddleware(thunk)
  )
)


