import React from "react";
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import {reducer, Operation} from './reducer.js';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch.jsx';
import {compose} from 'recompose';
import thunk from 'redux-thunk';
import createAPI from './api.js';

const AppWrapped = withScreenSwitch(App);

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
  );

  store.dispatch(Operation.loadQuestions());
  ReactDOM.render(<Provider store={store}>
    <AppWrapped
    />
  </Provider>,
  document.getElementById(`root`)
  );
};

init();
