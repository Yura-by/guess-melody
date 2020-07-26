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
import {Operation as UserOperation} from './reducer/user/user.js';
import {Router} from 'react-router-dom';
import history from './history.js';
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

  store.dispatch(UserOperation.checkAuth());

  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <AppWrapped />
    </Router>
  </Provider>,
  document.getElementById(`root`)
  );
};

init();
