import React, { useEffect } from "react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./redux/reducers/rootReducer";
import Main from "./routes/Main";
import firebase from "firebase";
import { firebaseConfig } from "./fbConfig";

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  }, []);

  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
