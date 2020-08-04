import * as React from "react";
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './components/app/app';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';
import createAPI from './api';
import reducer from './reducer/reducer';
import {Operation as DataOperation} from './reducer/data/data';
import {AppRoute} from './const';
import history from './history';

const AppWrapped = withScreenSwitch(App);

const init = (): void => {
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
