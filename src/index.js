import React from "react";
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import {reducer, Operation} from './reducer.js';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch.jsx';
import thunk from 'redux-thunk';
import createAPI from './api.js';
import {composeWithDevTools} from 'redux-devtools-extension';

const AppWrapped = withScreenSwitch(App);

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(Operation.loadQuestions());

  store.dispatch(Operation.checkAuth());

  ReactDOM.render(<Provider store={store}>
    <AppWrapped
    />
  </Provider>,
  document.getElementById(`root`)
  );
};

init();
