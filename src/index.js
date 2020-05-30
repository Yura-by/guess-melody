import React from "react";
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app.jsx';
// import gameData from './mocks/questions.js';
import {reducer} from './reducer.js';

const init = () => {
  // const {settings, questions} = gameData;
  const store = createStore(reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);
  ReactDOM.render(<Provider store={store}>
    <App
      // errorCount={settings.errorCount}
      // gameTime={settings.gameTime}
      // questions={questions}
      // gameData={gameData}
    />
  </Provider>,
  document.getElementById(`root`)
  );
};

init();
