import React from "react";
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import {reducer} from './reducer.js';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch.jsx';

const AppWrapped = withScreenSwitch(App);

const init = () => {
  // const {settings, questions} = gameData;
  const store = createStore(reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);
  ReactDOM.render(<Provider store={store}>
    <AppWrapped
    />
  </Provider>,
  document.getElementById(`root`)
  );
};

init();
