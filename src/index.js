import React from "react";
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import gameData from './mocks/questions.js';

const init = () => {
  // const {settings, questions} = gameData;
  ReactDOM.render(
      <App
        // errorCount={settings.errorCount}
        // gameTime={settings.gameTime}
        // questions={questions}
        gameData={gameData}
      />,
      document.getElementById(`root`)
  );
};

init();
