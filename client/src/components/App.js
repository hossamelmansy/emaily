import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import RootReducer from '../reducers';

const store = createStore(RootReducer, applyMiddleware());

function App() {
  return (
    <Provider store={store}>
      <div>Hello World</div>
    </Provider>
  );
}

export default App;
