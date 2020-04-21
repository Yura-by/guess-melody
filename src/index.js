import React from "react";
import ReactDOM from 'react-dom';
import {App} from './components/app/app.jsx';

const init = () => {
  ReactDOM.render(
      <App
        errorCount={7}
        gameTime={`4`}
      />,
      document.getElementById(`root`)
  );
};

init();
