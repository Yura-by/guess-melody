import {Component} from 'react';
import PropTypes from 'prop-types';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import GameScreen from '../game-screen/game-screen.jsx';

class App extends Component {
  render() {
    const {renderScreen} = this.props;
    return renderScreen();
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/">
    //       {this._renderGameScreen()}
    //     </Route>
    //     <Route exact path="/artist">
    //       <GameArtist
    //         question={questions[1]}
    //         onAnswer={() => {}}
    //       />
    //     </Route>
    //     <Route path="/genre">
    //       <GameGenre
    //         question={questions[0]}
    //         onAnswer={() => {}}
    //       />
    //     </Route>
    //   </Switch>
    // </BrowserRouter>
    // );
  }
}

App.propTypes = {
  renderScreen: PropTypes.func.isRequired,
};

export default App;

