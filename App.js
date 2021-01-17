import { StatusBar } from "expo-status-bar";
import React from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./redux/reducers/rootReducer";
import Main from "./routes/Main";

const App = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
