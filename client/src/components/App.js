import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import RootReducer from '../reducers';

function Header() {
  return <h2>Header</h2>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}

function SurveyNew() {
  return <h2>SurveyNew</h2>;
}

function Landing() {
  return <h2>Landing</h2>;
}

function App() {
  return (
    <Provider store={createStore(RootReducer, applyMiddleware())}>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/surveys" component={Dashboard} />
        <Route path="/surveys/new" component={SurveyNew} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
