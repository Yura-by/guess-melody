import React from "react";
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch.jsx';
import thunk from 'redux-thunk';
import createAPI from './api.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {AppRoute} from './const.js';

const AppWrapped = withScreenSwitch(App);

const init = () => {
  const api = createAPI(() => history.push(AppRoute.LOGIN));
  const store = createStore(reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  store.dispatch(DataOperation.loadQuestions());

  ReactDOM.render(<Provider store={store}>
    <AppWrapped />
  </Provider>,
  document.getElementById(`root`)
  );
};

init();
